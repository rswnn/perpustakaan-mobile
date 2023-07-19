import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {BookState, BorrowState} from '@interfaces';

const useBorrow = () => {
  const getBorrow = useAppAsyncDispatch(action.BorrowAction.getPeminjam);
  const getBook = useAppAsyncDispatch(action.BookAction.getBooks);
  const setBorrow = useAppAsyncDispatch(action.BorrowAction.addPeminjam);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {borrows} = useTypedSelector<BorrowState>('peminjamen');
  const {books} = useTypedSelector<BookState>('books');
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
      await getBook();
    } catch (error) {
      console.log(error);
    }
  }, [getBorrow, getBook]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    books,
  };
};

export default useBorrow;
