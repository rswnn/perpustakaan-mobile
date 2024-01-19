import {View, StyleSheet, Text, FlatList} from 'react-native';
import useStudentDetail from './useStudentDetail';
// import {StudentData} from '@components';
// import {List} from 'react-native-paper';
// import {List} from 'react-native-paper';
// import {useCallback} from 'react';
// import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {StudentData} from '@components';
import {Card} from 'react-native-paper';
import React, {useState} from 'react';
import useCategory from '../CategoryTask/useCategory';
import {useAppAsyncDispatch} from '@hooks';
import {action} from '@store';

const StudentDetailScreen = ({route, navigation}: any) => {
  const {categories, listTasks} = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const {studentDetail} = useStudentDetail({
    nis: route.params.nis,
  });

  const getTaskByCategoryIdAction = useAppAsyncDispatch(
    action.TaskAction.getTaskByCategoryIdAction,
  );

  const onPressCategory = async (id: number) => {
    try {
      if (selectedCategory === null || id === 99) {
        await getTaskByCategoryIdAction({
          payload: {
            param: id,
          },
        });
        setSelectedCategory(selectedCategory === null ? id : null);
      }
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const onPressTask = (id: number) => {
    if (id !== 99) {
      navigation.navigate('ResultTaskScreen', {
        taskID: id,
        studentName: studentDetail ? studentDetail?.fullName : '',
        class: route?.params?.classId ?? '',
        nis: route.params.nis,
      });
    } else {
      setSelectedCategory(null);
    }
  };

  const renderList = () => {
    if (selectedCategory === null) {
      return (
        <FlatList
          data={categories}
          renderItem={({item}) => {
            return (
              <Card
                style={styles.marbot}
                onPress={() => onPressCategory(item.id)}>
                <Card.Title title={item.category_name} />
              </Card>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      );
    }

    return (
      <FlatList
        data={[...listTasks, {id: 99, title: 'Kembali'}]}
        renderItem={({item}) => {
          return (
            <Card style={styles.marbot} onPress={() => onPressTask(item.id)}>
              <Card.Title title={item.title} />
            </Card>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        <View style={(styles.containerButton, styles.surahList, styles.marbot)}>
          <Text style={styles.subtitle}>Daftar Hafalan</Text>
        </View>
        {renderList()}
      </React.Fragment>
    );
  };

  return (
    <View style={styles.centerFlex}>
      <StudentData
        nama={studentDetail ? studentDetail?.fullName : ''}
        kelas={route?.params?.classId ?? ''}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  centerFlex: {
    padding: 10,
    flex: 1,
  },
  widthFull: {
    width: '100%',
    // marginBottom: 10,
  },
  borderBottom: {
    borderBottomColor: 'black',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  containerButton: {
    width: '100%',
    marginBottom: 150,
  },
  subtitle: {
    color: 'black',
    marginVertical: 10,
  },
  surahList: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginVertical: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  marbot: {
    marginBottom: 10,
  },
});

export default StudentDetailScreen;
