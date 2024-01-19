import {useCallback} from 'react';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector} from '@hooks';
import {TaskState} from '@interfaces';

const useTask = ({navigation}: any) => {
  // const getTaskByCategoryTaskId = useAppAsyncDispatch(
  //   action.TaskAction.getTaskByIdAction,
  // );
  const {tasks} = useTypedSelector<TaskState>('hafalan');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePressCategoryList = async (value: any) => {
    try {
      navigation.navigate('DetailTask', {
        selectedTask: value,
      });
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  return {
    tasks,
    handlePressCategoryList,
    handleSheetChanges,
  };
};

export default useTask;
