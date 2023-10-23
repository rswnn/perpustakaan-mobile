import {useCallback, useEffect} from 'react';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {TaskState} from '@interfaces';

const useTask = ({navigation}: any) => {
  const getTask = useAppAsyncDispatch(action.TaskAction.getTaskAction);
  const getTaskByCategoryTaskId = useAppAsyncDispatch(
    action.TaskAction.getTaskByIdAction,
  );
  const {tasks} = useTypedSelector<TaskState>('hafalan');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePressCategoryList = async (value: any) => {
    try {
      await getTaskByCategoryTaskId({
        payload: {
          param: value[0]?.id,
        },
      });
      navigation.navigate('DetailTask');
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getTask();
    } catch (error) {
      console.log(error);
    }
  }, [getTask]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    tasks,
    handlePressCategoryList,
    handleSheetChanges,
  };
};

export default useTask;
