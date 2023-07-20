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
import useReturn from './useReturn';
import {Formik} from 'formik';
import styles from './styles';
import {DetailBorrowRes} from '@interfaces';
// import {Borrow} from '@interfaces';
import {useTypedSelector} from '@hooks';

const ReturnScreen = () => {
  const {
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
    // handleUpdateStatus,
  } = useReturn();
  // const tes: any = [];

  const {loading} = useTypedSelector<DetailBorrowRes>('peminjaman-details');
  // const {borrows} = use
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
      const books = item.attributes.buku_id.data[0]?.attributes;
      const rents = item.attributes.peminjaman_id.data[0]?.attributes;
      const student =
        item.attributes.peminjaman_id.data[0]?.attributes.nis.data[0]
          ?.attributes;
      // console.log(rents?.status, 'STATUS');
      // console.log(item.id, 'IDDD');
      return (
        <List.Accordion
          title={`Buku : ${books?.judul_buku}`}
          description={`Kode Buku : ${books?.kode_buku}`}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item
            title={`Nama Siswa : ${student?.nama_siswa} - ${student?.nis}`}
          />
          <List.Item title={`Tgl Pinjam : ${rents?.tgl_pinjam}`} />
          <List.Item title={`Tgl Pengembalian : ${rents?.tgl_kembali}`} />

          <List.Item title={`Status : ${rents?.status}`} />
          <Pressable
            onPress={() =>
              handlePresentModalPress(item.attributes.peminjaman_id.data[0]?.id)
            }>
            <List.Icon
              icon="lead-pencil"
              style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 20}}
            />
          </Pressable>
        </List.Accordion>
      );
    },
    [renderLeftListItem, renderRightListItem, handlePresentModalPress],
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
          {/* <Button
            style={styles.buttonAdd}
            mode="contained"
            onPress={handlePresentModalPress}>
            Tambah
          </Button> */}
        </View>
        <View style={styles.bottomBody}>
          <FlatList
            data={detailBorrows}
            renderItem={renderItem}
            keyExtractor={item => item.attributes.createdAt}
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          style={styles.bottomSheetStyle}>
          <View style={styles.contentContainer}>
            <Text style={styles.bottomSheetTitle}>Pengembalian Buku</Text>
            <Formik
              initialValues={{
                status: '',
              }}
              onSubmit={onSubmit}>
              {({
                // setFieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
              }) => (
                <View style={styles.formWrapper}>
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('status')}
                    onBlur={handleBlur('status')}
                    value={values.status}
                    mode="outlined"
                    label="Status"
                    returnKeyType="done"
                  />
                  {/* <TextInput
                    style={styles.space}
                    onChangeText={handleChange('tglPengembalian')}
                    onBlur={handleBlur('tglPengembalian')}
                    value={values.tglPengembalian}
                    mode="outlined"
                    label="Tanggal Pengembalian"
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
                    onChangeText={handleChange('judulBuku')}
                    onBlur={handleBlur('judulBuku')}
                    value={values.judulBuku}
                    mode="outlined"
                    label="Judul Buku"
                    returnKeyType="next"
                    autoCapitalize="none"
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
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </React.Fragment>
  );
};

export default ReturnScreen;
