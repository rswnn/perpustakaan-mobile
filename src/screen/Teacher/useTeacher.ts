import {useState, useCallback, useMemo, useEffect} from 'react';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {TeacherState} from '@interfaces';

const useMember = () => {
  const getTeacher = useAppAsyncDispatch(action.TeacherAction.getTeacherAction);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {teacher} = useTypedSelector<TeacherState>('teacher');

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const openMenu = useCallback((index: number) => setVisible(index), []);
  const closeMenu = useCallback(() => setVisible(null), []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  const onSubmit = async (param?: any) => {
    console.log(param, 'PARAM');
    try {
      // bottomSheetRef.current?.close();
    } catch (error) {
      console.log(error);
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
    searchQuery,
    visible,
    snapPoints,
    handleSheetChanges,
    onChangeSearch,
    openMenu,
    closeMenu,
    onSubmit,
  };
};

export default useMember;
