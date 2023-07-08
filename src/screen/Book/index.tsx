import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
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
import useBook from './useBook';
import {Formik} from 'formik';
import styles from './styles';

const BookScreen = () => {
  const {
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
  } = useBook();

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
      return (
        <List.Accordion
          title={`Buku ${item.book}`}
          description={item.name}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
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
          data={listMember}
          renderItem={renderItem}
          keyExtractor={item => item.nim}
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
              kodeBuku: '',
              judulBuku: '',
              kategoriBuku: '',
              namaPenulis: '',
              namaPenerbit: '',
              tahunPenerbit: '',
            }}
            onSubmit={onSubmit}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.formWrapper}>
                <TextInput
                  onChangeText={handleChange('kodeBuku')}
                  onBlur={handleBlur('kodeBuku')}
                  value={values.kodeBuku}
                  mode="outlined"
                  label="Kode Buku"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('judulBuku')}
                  onBlur={handleBlur('judulBuku')}
                  value={values.judulBuku}
                  mode="outlined"
                  label="Judul Buku"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('kategoriBuku')}
                  onBlur={handleBlur('kategoriBuku')}
                  value={values.kategoriBuku}
                  mode="outlined"
                  label="Kategori Buku"
                  returnKeyType="next"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('namaPenulis')}
                  onBlur={handleBlur('namaPenulis')}
                  value={values.namaPenulis}
                  mode="outlined"
                  label="Nama Penulis"
                  returnKeyType="next"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('namaPenerbit')}
                  onBlur={handleBlur('namaPenerbit')}
                  value={values.namaPenerbit}
                  mode="outlined"
                  label="Nama Penerbit"
                  returnKeyType="next"
                />
                <TextInput
                  onChangeText={handleChange('thPenerbit')}
                  onBlur={handleBlur('thPenerbit')}
                  value={values.tahunPenerbit}
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
  );
};

export default BookScreen;
