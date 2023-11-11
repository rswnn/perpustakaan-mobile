/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {StudentState} from '@interfaces';

const useStudent = ({classId}: any) => {
  const getStudentByClassCode = useAppAsyncDispatch(
    action.StudentAction.getStudentByClasscode,
  );

  const {student} = useTypedSelector<StudentState>('student');

  const fetchStudentByClassCode = async () => {
    try {
      if (classId) {
        await getStudentByClassCode({
          payload: {
            param: classId,
          },
        });
      }
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await fetchStudentByClassCode();
    } catch (error) {
      console.log(error);
    }
  }, [classId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    student,
  };
};

export default useStudent;
