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

  const snapPoints = useMemo(() => ['25%', '50%'], []);

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

  const onSubmit = (param?: any) => {
    console.log(param, '???????');
    bottomSheetRef.current?.close();
    setBook({
      payload: {...param},
    });
  };

  useEffect(() => {
    // getBook();
  }, []);

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
  };
};

export default useBook;
