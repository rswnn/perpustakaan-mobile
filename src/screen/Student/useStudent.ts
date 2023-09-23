import {useState, useCallback, useEffect} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {StudentState} from '@interfaces';

const useStudent = () => {
  const getStudent = useAppAsyncDispatch(action.StudentAction.getStudentAction);
  const getStudentByClassCode = useAppAsyncDispatch(
    action.StudentAction.getStudentByClasscode,
  );

  const {student} = useTypedSelector<StudentState>('student');
  const [renderStudent, setRenderStudent] = useState(false);

  const handlePressClassTogetStudent = async (value: any) => {
    try {
      await getStudentByClassCode({
        payload: {
          param: value[0]?.kode_kelas,
        },
      });
      console.log(value, 'VALUE');
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getStudent();
    } catch (error) {
      console.log(error);
    }
  }, [getStudent]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    student,
    renderStudent,
    setRenderStudent,
    handlePressClassTogetStudent,
  };
};

export default useStudent;
