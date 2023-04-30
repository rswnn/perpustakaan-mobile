import {useState, useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
const listMember = [
  {name: 'Riski Mardianto', nim: '171011401469', show: false},
  {name: 'Riski Ganteng', nim: '171011401499', show: false},
  {name: 'Riski Pinjol', nim: '171011401489', show: false},
  {name: 'Riski Boots', nim: '171011401439', show: false},
  {name: 'Riski Unpam', nim: '171011401419', show: false},
  {name: 'Riski Pirang', nim: '171011401449', show: false},
  {name: 'Riski Trifting', nim: '171011401269', show: false},
  {name: 'Riski Bengkel', nim: '171011401409', show: false},
  {name: 'Riski Taylor', nim: '171011401479', show: false},
  {name: 'Riski Kalung Emas', nim: '171011101469', show: false},
  {name: 'Riski Kancil', nim: '171011412469', show: false},
  {name: 'Riski Dapur Coklat', nim: '171041401469', show: false},
  {name: 'Riski Beat Speed', nim: '171011408869', show: false},
];

const useBook = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState<number | null>();

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

  return {
    listMember,
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
