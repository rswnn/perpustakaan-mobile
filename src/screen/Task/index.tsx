/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonCustom} from '@components';
import {TextCustom} from '@components';
import {AuthResponseType} from '@interfaces';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {action} from '@store';
import {FlatList} from 'react-native-gesture-handler';
import useTask from './useTask';

const {TaskAction} = action;

const TaskScreen = () => {
  const {handlePressCategoryList, renderTask, tasks} = useTask();
  const user = useTypedSelector<AuthResponseType>('auth');
  const getTaskById = useAppAsyncDispatch(TaskAction.getTaskByIdAction);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    try {
      setRefresh(true);
      getTaskById(user?.token);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  const renderContent = () => {
    if (renderTask) {
      return (
        <FlatList
          data={tasks}
          refreshing={refresh}
          onRefresh={() => onRefresh()}
          renderItem={({item}) => (
            <ButtonCustom
              style={styles.button}
              key={item.id}
              onPress={() => handlePressCategoryList(tasks)}>
              <TextCustom>{item.title}</TextCustom>
            </ButtonCustom>
          )}
          keyExtractor={item => item.title}
        />
      );
    }
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

export default TaskScreen;
