import {useState, useCallback, useEffect} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {TeacherState} from '@interfaces';

const useTeacher = () => {
  const getTeacher = useAppAsyncDispatch(action.TeacherAction.getTeacherAction);
  const getTeacherByNip = useAppAsyncDispatch(
    action.TeacherAction.getTeacherByNipAction,
  );

  const {teacher} = useTypedSelector<TeacherState>('teacher');
  const [renderTeacher, setRenderTeacher] = useState(false);

  // const fetchData = await

  const handlePressTeacherById = async (value: any) => {
    try {
      await getTeacherByNip({
        payload: {
          param: value[0]?.nip,
        },
      });
      console.log(value, 'VALUE');
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getTeacher();
    } catch (error) {
      console.log(error);
    }
  }, [getTeacher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    teacher,
    renderTeacher,
    setRenderTeacher,
    handlePressTeacherById,
  };
};

export default useTeacher;
