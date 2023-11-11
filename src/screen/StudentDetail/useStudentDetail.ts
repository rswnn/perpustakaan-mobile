/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {StudentState} from '@interfaces';

const useStudentDetail = ({nis}: any) => {
  // const getStudent = useAppAsyncDispatch(action.StudentAction.getStudentAction);
  const getStudentByNis = useAppAsyncDispatch(
    action.StudentAction.getStudentByNisAction,
  );

  const {student, studentDetail} = useTypedSelector<StudentState>('student');
  const [visible, setVisible] = useState<number | null>();

  const openMenu = useCallback((index: number) => setVisible(index), []);
  const closeMenu = useCallback(() => setVisible(null), []);

  const fetchStudentByNis = async () => {
    try {
      await getStudentByNis({
        payload: {
          param: nis,
        },
      });
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await fetchStudentByNis();
    } catch (error) {
      console.log(error);
    }
  }, [nis]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    student,
    visible,
    openMenu,
    closeMenu,
    studentDetail,
  };
};

export default useStudentDetail;
