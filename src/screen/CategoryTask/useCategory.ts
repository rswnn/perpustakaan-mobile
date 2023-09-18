// import {useState, useCallback, useMemo, useEffect} from 'react';
// // import {BottomSheetModal} from '@gorhom/bottom-sheet';
// import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
// import {action} from '@store';
// import {ClassroomState} from '@interfaces';

// const useMember = () => {
//   const getClassroom = useAppAsyncDispatch(action.Classroom.getClassroomAction);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [visible, setVisible] = useState<number | null>();
//   const {classroom} = useTypedSelector<ClassroomState>('classroom');

//   const snapPoints = useMemo(() => ['25%', '90%'], []);

//   const openMenu = useCallback((index: number) => setVisible(index), []);
//   const closeMenu = useCallback(() => setVisible(null), []);

//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   const onChangeSearch = useCallback(
//     (query: string) => setSearchQuery(query),
//     [],
//   );

//   const onSubmit = async (param?: any) => {
//     console.log(param, 'PARAM');
//     try {
//       // bottomSheetRef.current?.close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       await getClassroom();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [getClassroom]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return {
//     classroom,
//     searchQuery,
//     visible,
//     snapPoints,
//     handleSheetChanges,
//     onChangeSearch,
//     openMenu,
//     closeMenu,
//     onSubmit,
//   };
// };

// export default useMember;
