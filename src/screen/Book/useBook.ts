import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {BookState} from '@interfaces';

const useBook = () => {
  const getBook = useAppAsyncDispatch(action.BookAction.getBooks);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {books} = useTypedSelector<BookState>('books');
  const setBook = useAppAsyncDispatch(action.BookAction.addBooks);
  const deleteBook = useAppAsyncDispatch(action.BookAction.deleteBooks);

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

  const handleDeleteBook = useCallback(
    async (id: any) => {
      try {
        await deleteBook({
          payload: {
            param: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [deleteBook],
  );

  const onSubmit = async (param?: any) => {
    try {
      await setBook({
        payload: {data: {...param}},
      });

      await fetchData();

      bottomSheetRef.current?.close();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getBook();
    } catch (error) {
      console.log(error);
    }
  }, [getBook]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    books,
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
    handleDeleteBook,
  };
};

export default useBook;
