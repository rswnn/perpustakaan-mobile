import {useState, useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
const listMember = [
  {book:'Pemrograman',name: 'Riski Mardianto', nim: '171011401469', show: false},
  {book:'Pemrog',name: 'Riski Ganteng', nim: '171011401499', show: false},
  {book:'raman',name: 'Riski Pinjol', nim: '171011401489', show: false},
  {book:'Pem',name: 'Riski Boots', nim: '171011401439', show: false},
  {book:'man',name: 'Riski Unpam', nim: '171011401419', show: false},
  {book:'Pe',name: 'Riski Pirang', nim: '171011401449', show: false},
  {book:'rograman',name: 'Riski Trifting', nim: '171011401269', show: false},
  {book:'rogram',name: 'Riski Bengkel', nim: '171011401409', show: false},
  {book:'Pemrograman',name: 'Riski Taylor', nim: '171011401479', show: false},
  {book:'Pemrograman',name: 'Riski Kalung Emas', nim: '171011101469', show: false},
  {book:'Pemrograman',name: 'Riski Kancil', nim: '171011412469', show: false},
  {book:'Pemrograman',name: 'Riski Dapur Coklat', nim: '171041401469', show: false},
  {book:'Pemrograman',name: 'Riski Beat Speed', nim: '171011408869', show: false},
];

const useReport = () => {
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

export default useReport;
