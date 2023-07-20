import {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {DetailBorrowState} from '@interfaces';

const useReturn = () => {
  const getBorrow = useAppAsyncDispatch(
    action.DetailBorrow.getPeminjamDetailActionWithStatus,
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {detailBorrows} =
    useTypedSelector<DetailBorrowState>('peminjaman-details');
  const [itemId, setItemId] = useState<number | null>();

  // const {borrows} = useTypedSelector<BorrowState>('peminjamen');
  const setReturn = useAppAsyncDispatch(
    action.BorrowAction.updateStatusPeminjamAction,
  );

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const openMenu = useCallback((index: number) => setVisible(index), []);
  const closeMenu = useCallback(() => setVisible(null), []);
  const handlePresentModalPress = useCallback((id: number) => {
    bottomSheetRef.current?.present();
    setItemId(id);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleUpdateStatus = useCallback(
    async (id: any) => {
      try {
        await setReturn({
          payload: {
            param: id,
            status: 'dikembalikan',
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [setReturn],
  );

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  const onSubmit = async (status?: any) => {
    try {
      await setReturn({
        payload: {
          data: {
            ...status,
          },
          param: itemId,
        },
      });
      await fetchData();

      bottomSheetRef.current?.close();

      setItemId(null);
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

  return {
    detailBorrows,
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
    handleUpdateStatus,
  };
};

export default useReturn;
