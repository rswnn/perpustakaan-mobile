/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {action} from '@store';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {AuthResponseType, CategoryState, ClassroomState} from '@interfaces';
import {ButtonCustom, TextCustom} from '@components';
import {FlatList} from 'react-native-gesture-handler';

const {CategoryAction} = action;
const {ClassroomAction} = action;
const {TaskAction} = action;

const Dashboard = ({navigation, ...props}: any) => {
  const getCategory = useAppAsyncDispatch(CategoryAction.getCategoryAction);
  const getClassroom = useAppAsyncDispatch(ClassroomAction.getClassroomAction);
  const getClassroomByNip = useAppAsyncDispatch(
    ClassroomAction.getClassroomByNipAction,
  );

  const getTaskByCategoryId = useAppAsyncDispatch(TaskAction.getTaskByIdAction);
  const user = useTypedSelector<AuthResponseType>('auth');
  const {categories} = useTypedSelector<CategoryState>('category');
  const {classroom} = useTypedSelector<ClassroomState>('classRoom');
  const [refresh, setRefresh] = useState(false);

  const fetchData = useCallback(() => {
    if (!user?.token) {
      props.navigation.navigate('login');
    }
    if (user?.loginType === 'guru') {
      getClassroom();
      getClassroomByNip({token: user?.token, nip: user?.user.nip});
      getCategory();
    } else {
      getCategory();
    }
  }, [
    user?.token,
    user?.loginType,
    user?.user.nip,
    props.navigation,
    getClassroom,
    getClassroomByNip,
    getCategory,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePressClass = async (value: any) => {
    try {
      navigation.navigate('studentScreen', {
        classId: value?.kode_kelas,
      });
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };
  const navigateToSurah = useCallback(() => {
    navigation.navigate('surahScreen');
  }, [navigation]);

  const handlePressCategoryList = async (value: any) => {
    try {
      await getTaskByCategoryId({
        payload: {
          param: value?.id,
        },
      });
      navigateToSurah();
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const onRefresh = async () => {
    try {
      await setRefresh(true);
      await getCategory(user?.token);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  const renderContent = () => {
    return (
      <View style={styles.innerContainer}>
        {user?.loginType === 'guru' ? (
          classroom !== null ? (
            <FlatList
              data={classroom}
              refreshing={refresh}
              onRefresh={() => onRefresh()}
              renderItem={({item}) => (
                <ButtonCustom
                  style={styles.button}
                  onPress={() => handlePressClass(item)}
                  key={item.kode_kelas}>
                  <TextCustom>{item.nama_kelas}</TextCustom>
                </ButtonCustom>
              )}
              keyExtractor={item => item.kode_kelas}
            />
          ) : (
            <View>
              <Text style={styles.title}>Data Tidak Ditemukan</Text>
            </View>
          )
        ) : categories !== null ? (
          <FlatList
            data={categories}
            refreshing={refresh}
            onRefresh={() => onRefresh()}
            renderItem={({item}) => (
              <ButtonCustom
                style={styles.button}
                key={item.id}
                onPress={() => handlePressCategoryList(item)}>
                <TextCustom>{item.category_name}</TextCustom>
              </ButtonCustom>
            )}
            keyExtractor={item => item.category_name}
          />
        ) : (
          <View>
            <Text style={styles.title}>Data Tidak Ditemukan</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.center, styles.flex, styles.container]}>
      <View style={styles.containerListButton}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  containerTitle: {
    height: 100,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  containerListButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  containerButton: {
    width: '100%',
    marginTop: 10,
    // marginBottom: 10,
  },
  button: {
    flex: 1,
    marginVertical: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default Dashboard;
