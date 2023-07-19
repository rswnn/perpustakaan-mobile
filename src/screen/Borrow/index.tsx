import React, {useCallback} from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import {Container, BottomSheet} from '@components';
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
import {useTypedSelector} from '@hooks';
import {BorrowState} from '@interfaces';
import {Picker} from '@react-native-picker/picker';

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
    handleDeleteBorrow,
    books,
  } = useBorrow();

  const {loadingBorrow} = useTypedSelector<BorrowState>('peminjamen');

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
      // console.log(item, 'ITEM');
      const student = item.attributes.nis.data[0]?.attributes;
      return (
        <List.Accordion
          title={`Nama Siswa : ${student?.nama_siswa}`}
          description={`Tgl Kembali : ${item.attributes.tgl_kembali}`}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item title={`Nis : ${student?.nis}`} />
          <List.Item title={`Tgl Pinjam : ${item.attributes.tgl_pinjam}`} />
          <Pressable onPress={() => handleDeleteBorrow(item.id)}>
            <List.Icon
              icon="delete"
              style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 20}}
            />
          </Pressable>
        </List.Accordion>
      );
    },
    [renderLeftListItem, renderRightListItem, handleDeleteBorrow],
  );

  return (
    <React.Fragment>
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
            keyExtractor={item => item.id.toString()}
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
                kode_buku: '',
                tgl_pinjam: '',
                tgl_kembali: '',
                lama_pinjam: '',
                status: '',
              }}
              onSubmit={onSubmit}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.formWrapper}>
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('nis')}
                    onBlur={handleBlur('nis')}
                    value={values.nis.toString()}
                    mode="outlined"
                    label="NIS"
                    keyboardType="number-pad"
                    returnKeyType="next"
                  />
                  <View style={[styles.pickerStyle, styles.space]}>
                    <Picker
                      selectedValue={values.kode_buku}
                      onValueChange={handleChange('kode_buku')}>
                      {books.map(item => {
                        return (
                          <Picker.Item
                            label={item.attributes.judul_buku}
                            value={item.id}
                            key={item.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('tgl_pinjam')}
                    onBlur={handleBlur('tgl_pinjam')}
                    value={values.tgl_pinjam}
                    mode="outlined"
                    label="Tanggal Pinjam"
                    returnKeyType="next"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('tgl_kembali')}
                    onBlur={handleBlur('tgl_kembali')}
                    value={values.tgl_kembali}
                    mode="outlined"
                    label="Tanggal Jatuh Tempo"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('lama_pinjam')}
                    onBlur={handleBlur('lama_pinjam')}
                    value={values.lama_pinjam}
                    mode="outlined"
                    label="Status"
                    returnKeyType="next"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('status')}
                    onBlur={handleBlur('status')}
                    value={values.status}
                    mode="outlined"
                    label="Judul Buku"
                    autoCapitalize="none"
                    returnKeyType="done"
                  />
                  {/* <TextInput
                    style={styles.space}
                    onChangeText={handleChange('judul_buku')}
                    onBlur={handleBlur('judul_buku')}
                    value={values.judul_buku}
                    mode="outlined"
                    label="Judul Buku"
                    autoCapitalize="none"
                    returnKeyType="done"
                  /> */}
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

      {loadingBorrow.get && (
        <View style={styles.container}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </React.Fragment>
  );
};

export default BorrowScreen;
