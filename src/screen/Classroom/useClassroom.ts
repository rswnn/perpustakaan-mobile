import {useCallback, useEffect, useState} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {ClassroomState} from '@interfaces';

const useClassroom = () => {
  const getClassroom = useAppAsyncDispatch(
    action.ClassroomAction.getClassroomAction,
  );
  const getClassroomByKodeKelas = useAppAsyncDispatch(
    action.ClassroomAction.getClassroomByKodeKelasAction,
  );
  const {classroom} = useTypedSelector<ClassroomState>('classRoom');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [renderClassroom, setRenderClassroom] = useState(false);

  const handlePressClassCode = async (value: any) => {
    try {
      await getClassroomByKodeKelas({
        payload: {
          param: value[0]?.id,
        },
      });
      setRenderClassroom(!renderClassroom);
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getClassroom();
    } catch (error) {
      console.log(error);
    }
  }, [getClassroom]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classroom,
    renderClassroom,
    setRenderClassroom,
    handlePressClassCode,
    handleSheetChanges,
  };
};

export default useClassroom;
