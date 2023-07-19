import {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {DetailBorrowState} from '@interfaces';

const useReturn = () => {
  const getDetailBorrow = useAppAsyncDispatch(
    action.DetailBorrow.getPeminjamDetailAction,
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();
  const {detailBorrows} =
    useTypedSelector<DetailBorrowState>('peminjaman-details');
  const setReturnBook = useAppAsyncDispatch(
    action.BorrowAction.updateStatusPeminjamAction,
  );

  const updateStatus = useAppAsyncDispatch(
    action.DetailBorrow.updateStatusAction,
  );

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const openMenu = useCallback((index: number) => setVisible(index), []);
  const closeMenu = useCallback(() => setVisible(null), []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleUpdateStatus = useCallback(
    async (id: any) => {
      try {
        await updateStatus({
          payload: {
            param: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [updateStatus],
  );

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  const onSubmit = async (param?: any) => {
    try {
      await setReturnBook({
        payload: {data: {...param}},
      });
      await fetchData();

      bottomSheetRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getDetailBorrow();
    } catch (error) {
      console.log(error);
    }
  }, [getDetailBorrow]);

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
