import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {BorrowState} from '@interfaces';

const useBorrow = () => {
  const getBorrow = useAppAsyncDispatch(action.BorrowAction.getPeminjam);
  const setBorrow = useAppAsyncDispatch(action.BorrowAction.addPeminjam);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {borrows} = useTypedSelector<BorrowState>('peminjamen');
  const deleteBorrow = useAppAsyncDispatch(action.BorrowAction.deletePeminjam);

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const openMenu = useCallback((index: number) => setVisible(index), []);
  const closeMenu = useCallback(() => setVisible(null), []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  const handleDeleteBorrow = useCallback(
    async (id: any) => {
      try {
        await deleteBorrow({
          payload: {
            param: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [deleteBorrow],
  );

  const onSubmit = async (param?: any) => {
    try {
      setBorrow({
        payload: {data: {...param}},
      });
      fetchData();

      bottomSheetRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getBorrow();
    } catch (error) {
      console.log(error);
    }
  }, [getBorrow]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log(borrows, 'BBB');

  return {
    borrows,
    searchQuery,
    visible,
    snapPoints,
    handlePresentModalPress,
    handleSheetChanges,
    onChangeSearch,
    openMenu,
    closeMenu,
    bottomSheetRef,
    onSubmit,
    handleDeleteBorrow,
  };
};

export default useBorrow;
