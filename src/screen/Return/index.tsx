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
import useReturn from './useReturn';
import {Formik} from 'formik';
import styles from './styles';

const ReturnScreen = () => {
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
  } = useReturn();

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
          title={item.name}
          description={item.book}
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
  );
};

export default ReturnScreen;
