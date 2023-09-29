import {useCallback, useEffect} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {ClassroomState} from '@interfaces';

const useClassroom = ({classId}: any) => {
  const getClassroomByKodeKelas = useAppAsyncDispatch(
    action.ClassroomAction.getClassroomByKodeKelasAction,
  );
  const {classroom} = useTypedSelector<ClassroomState>('classRoom');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const fetchClassCode = async () => {
    try {
      await getClassroomByKodeKelas({
        payload: {
          param: classId,
        },
      });
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await fetchClassCode();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classroom,
    fetchClassCode,
    handleSheetChanges,
  };
};

export default useClassroom;
