import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {BorrowState} from '@interfaces';

const useBorrow = () => {
  const getBorrow = useAppAsyncDispatch(action.BorrowAction.getPeminjam);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {borrows} = useTypedSelector<BorrowState>('peminjamen');

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

  const onSubmit = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    getBorrow();
  }, []);

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
  };
};

export default useBorrow;
