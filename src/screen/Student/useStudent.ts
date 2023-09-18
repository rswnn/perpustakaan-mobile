import {useState, useCallback, useMemo, useEffect} from 'react';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {StudentState} from '@interfaces';

const useMember = () => {
  const getStudent = useAppAsyncDispatch(action.StudentAction.getStudentAction);

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {student} = useTypedSelector<StudentState>('student');
  // const {categories} = useTypedSelector<CategoryState>('categories');

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
