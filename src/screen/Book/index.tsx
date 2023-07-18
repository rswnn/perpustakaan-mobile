import React, {useCallback} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Container, BottomSheet} from '@components';
import {
  List,
  Menu,
  IconButton,
  Searchbar,
  Button,
  TextInput,
} from 'react-native-paper';
// import * as List from 'react-native-paper';

import {FlatList} from 'react-native-gesture-handler';
import useBook from './useBook';
import {Formik} from 'formik';
import styles from './styles';
import {BookResponseType} from '@interfaces';
import {useTypedSelector} from '@hooks';

const BookScreen = () => {
  const {
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
  } = useBook();

  const {loading} = useTypedSelector<BookResponseType>('books');
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
      // const kategoryBook = item.attributes.kategori_buku;
      // const test = {
      //   ...kategoryBook,
      // };

      return (
        <Container style={styles.container}>
          <List.Accordion
            key={item.attributes.kode_buku}
            title={`Buku ${item.attributes.judul_buku}`}
            description={`Penulis : ${item.attributes.nama_penulis}`}
            left={props => renderLeftListItem(props)}
            right={() => renderRightListItem(item, index)}>
            {/* <List.Item title={'Edit'} />
            <List.Item title={'Delete'} /> */}
            {/* <List.Item title={`Kode : ${item.attributes.kode_buku}`} />
            <List.Item title={`Penerbit : ${item.attributes.nama_penerbit}`} />
            <List.Item
              title={`Tahun Terbit : ${item.attributes.tahun_terbit}`}
            />
            <List.Item
              title={`Kategori : ${test.data.map(
                (x: any) => x.attributes.kategori_buku,
              )}`}
            />
             */}
          </List.Accordion>
        </Container>
      );
    },
    [renderLeftListItem, renderRightListItem],
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
            data={books}
            renderItem={renderItem}
            keyExtractor={item => item.attributes.kode_buku}
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
                kode_buku: '',
                judul_buku: '',
                nama_penulis: '',
                nama_penerbit: '',
                // kategori_buku: '',
                tahun_terbit: '',
              }}
              onSubmit={onSubmit}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.formWrapper}>
                  <TextInput
                    onChangeText={handleChange('kode_buku')}
                    onBlur={handleBlur('kode_buku')}
                    value={values.kode_buku}
                    mode="outlined"
                    label="Kode Buku"
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('judul_buku')}
                    onBlur={handleBlur('judul_buku')}
                    value={values.judul_buku}
                    mode="outlined"
                    label="Judul Buku"
                    returnKeyType="next"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('nama_penulis')}
                    onBlur={handleBlur('nama_penulis')}
                    value={values.nama_penulis}
                    mode="outlined"
                    label="Nama Penulis"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('nama_penerbit')}
                    onBlur={handleBlur('nama_penerbit')}
                    value={values.nama_penerbit}
                    mode="outlined"
                    label="Nama Penerbit"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  {/* <TextInput
                    style={styles.space}
                    onChangeText={handleChange('kategori_buku')}
                    onBlur={handleBlur('kategori_buku')}
                    value={values.kategori_buku}
                    mode="outlined"
                    label="Kategori Buku"
                    returnKeyType="next"
                  /> */}
                  <TextInput
                    onChangeText={handleChange('tahun_terbit')}
                    onBlur={handleBlur('tahun_terbit')}
                    value={values.tahun_terbit}
                    mode="outlined"
                    label="Tahun Penerbit"
                    returnKeyType="next"
                    keyboardType="number-pad"
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

export default BookScreen;
