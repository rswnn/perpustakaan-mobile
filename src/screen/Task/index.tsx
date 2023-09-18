/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, RefreshControl} from 'react-native';
import {ButtonCustom} from '@components';
import {TextCustom} from '@components';
import {AuthResponseType, TaskState} from '@interfaces';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {action} from '@store';
import {FlatList} from 'react-native-gesture-handler';

const {TaskAction} = action;

const SurahList = (props: any) => {
  const user = useTypedSelector<AuthResponseType>('auth');
  const {tasks} = useTypedSelector<TaskState>('hafalan');
  // const getTask = useAppAsyncDispatch(TaskAction.getTaskAction);
  const getTaskById = useAppAsyncDispatch(TaskAction.getTaskByIdAction);
  const [refresh, setRefresh] = useState(false);

  // fetching datas
  const fetchData = useCallback(async () => {
    if (!user?.token) {
      props.navigation.navigate('login');
    }
    // getTask();
    getTaskById({
      token: user?.token,
      id: props?.route?.params.data.id,
    });
  }, [
    user?.token,
    getTaskById,
    props?.route?.params.data.id,
    props.navigation,
  ]);

  const handlePressSurah = (value: any) => {
    console.log(value, 'VALUE HAFALAN SCREEN');
    props.navigation.navigate('hafalanScreen', {data: value});
  };

  const onRefresh = () => {
    try {
      setRefresh(true);
      getTaskById(user?.token);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={[styles.center, styles.flex]}>
      <View style={styles.containerListButton}>
        <View style={styles.innerContainer}>
          {tasks !== null ? (
            <FlatList
              data={tasks}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => onRefresh()}
                />
              }
              onRefresh={() => onRefresh()}
              renderItem={({item}) => (
                <ButtonCustom
                  style={styles.button}
                  key={item.id}
                  onPress={() => handlePressSurah(item)}>
                  <TextCustom>{item.id}</TextCustom>
                </ButtonCustom>
              )}
              keyExtractor={item => item.id}
              style={[styles.containerListButton, styles.flex]}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
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

export default SurahList;
