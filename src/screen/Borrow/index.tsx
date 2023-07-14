import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {Container, BottomSheet} from '@components';
// import {Row,Rows,Table} from 'react-native-table-component'
import {
  List,
  Menu,
  IconButton,
  Searchbar,
  Button,
  TextInput,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import useBorrow from './useBorrow';
import {Formik} from 'formik';
import styles from './styles';

const BorrowScreen = () => {
  const {
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
  } = useBorrow();

  const renderLeftListItem = useCallback((props: any) => {
    return <List.Icon {...props} icon="book" />;
  }, []);

  const renderRightListItem = useCallback(
    (_: any, index: number) => {
      const isShow = visible === index && visible !== null;
      return (
        <Menu
          visible={isShow}
          onDismiss={closeMenu}
          anchor={
            <IconButton icon="dots-vertical" onPress={() => openMenu(index)} />
          }>
          <Menu.Item title="Edit" />
          <Menu.Item title="Delete" />
        </Menu>
      );
    },
    [visible, openMenu, closeMenu],
  );

  const renderItem = useCallback(
    ({item, index}: any) => {
      // console.log(item.id, 'ITEM');
      return (
        <List.Item
          title={item.attributes.lama_pinjam}
          description={item.name}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}
        />
      );
    },
    [renderLeftListItem, renderRightListItem],
  );

  return (
    <Container style={styles.container}>
      <View style={styles.topBody}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Button
          style={styles.buttonAdd}
          mode="contained"
          onPress={handlePresentModalPress}>
          Tambah
        </Button>
      </View>
      <View style={styles.bottomBody}>
        <FlatList
          data={borrows}
          renderItem={renderItem}
          keyExtractor={item => item.status}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        style={styles.bottomSheetStyle}>
        <View style={styles.contentContainer}>
          <Text style={styles.bottomSheetTitle}>Peminjaman Buku</Text>
          <Formik
            initialValues={{
              nis: '',
              kodeBuku: '',
              tglPinjam: '',
              tglJatuhTempo: '',
              status: '',
              judulBuku: '',
            }}
            onSubmit={onSubmit}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.formWrapper}>
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('nis')}
                  onBlur={handleBlur('nis')}
                  value={values.nis}
                  mode="outlined"
                  label="NIS"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
                <TextInput
                  onChangeText={handleChange('kodeBuku')}
                  onBlur={handleBlur('kodeBuku')}
                  value={values.kodeBuku}
                  mode="outlined"
                  label="Kode Buku"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('tglPinjam')}
                  onBlur={handleBlur('tglPinjam')}
                  value={values.tglPinjam}
                  mode="outlined"
                  label="Tanggal Pinjam"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('tglJatuhTempo')}
                  onBlur={handleBlur('tglJatuhTempo')}
                  value={values.tglJatuhTempo}
                  mode="outlined"
                  label="Tanggal Jatuh Tempo"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('kodeBuku')}
                  onBlur={handleBlur('kodeBuku')}
                  value={values.kodeBuku}
                  mode="outlined"
                  label="Status"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('judulBuku')}
                  onBlur={handleBlur('judulBuku')}
                  value={values.judulBuku}
                  mode="outlined"
                  label="Judul Buku"
                  autoCapitalize="none"
                  returnKeyType="done"
                />
                <Button
                  mode="contained"
                  style={[styles.space, styles.btnSave]}
                  onPress={handleSubmit}>
                  Simpan
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </BottomSheet>
    </Container>
  );
};

export default BorrowScreen;
