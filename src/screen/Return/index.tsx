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
    handleUpdateStatus,
  } = useReturn();
  // const tes: any = [];

  const {loading} = useTypedSelector<DetailBorrowRes>('peminjaman-details');
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
      const rents = item.attributes.peminjaman_id;
      const books = item.attributes.buku_id;
      const splitBooks = {
        ...books,
      };

      const splitRents = {
        ...rents,
      };

      splitRents.data.map((items: any) =>
        console.log(items.attributes, 'RENTSS'),
      );
      splitBooks.data.map((items: any) =>
        console.log(items.attributes, 'BUKU'),
      );
      return (
        <List.Accordion
          title={`Buku : ${splitBooks.data.map(
            (items: any) => items.attributes.judul_buku,
          )}`}
          description={`Kode Buku : ${splitBooks.data.map(
            (items: any) => items.attributes.kode_buku,
          )}`}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item
            title={`Tgl Pinjam : ${splitRents.data.map(
              (items: any) => items.attributes.tgl_pinjam,
            )}`}
          />
          <List.Item
            title={`Tgl Pengembalian : ${splitRents.data.map(
              (items: any) => items.attributes.tgl_kembali,
            )}`}
          />
          <List.Item
            title={`Lama Pinjam : ${splitRents.data.map(
              (items: any) => items.attributes.lama_pinjam,
            )}`}
          />
          <Pressable onPress={() => handleUpdateStatus(item.id)}>
            <List.Icon
              icon="lead-pencil"
              style={{alignSelf: 'flex-end', marginRight: 30}}
            />
          </Pressable>
        </List.Accordion>
      );
    },
    [renderLeftListItem, renderRightListItem, handleUpdateStatus],
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
            <Text style={styles.bottomSheetTitle}>Tambah Buku</Text>
            <Formik
              initialValues={{
                nis: '',
                tglJatuhTempo: '',
                tglPengembalian: '',
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
                    returnKeyType="done"
                  />
                  <TextInput
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
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </React.Fragment>
  );
};

export default ReturnScreen;
