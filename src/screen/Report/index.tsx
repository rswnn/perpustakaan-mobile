import React, {useCallback,useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import PagerView from 'react-native-pager-view';
import {FlatList} from 'react-native-gesture-handler';
import useReport from './useReport';
import {Formik} from 'formik';
import styles from './styles';

const ReportScreen = () => {
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
  } = useReport();

  const renderLeftListItem = useCallback((props: any) => {
    return <List.Icon {...props} icon="book" />;
  }, []);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

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
      {/* <DatePicker date={date}/> */}
      <Button 
      onPress={() => setOpen(true)}
      style={styles.buttonTgl}
      >
        Fillter Tanggal
      </Button>
      <DatePicker
      mode="date"
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> */}
        <Button
          style={styles.buttonAdd}
          mode="contained"
          // onPress={handlePresentModalPress}
          >
          Tampilkan
        </Button>
      </View>
      <View style={styles.bottomBody}>
      <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.tabView}>
        <Text style={styles.textTabView}>Peminjaman</Text>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={item => item.nim}
        />
      </View>
      <View key="2" style={styles.tabView}>
        <Text style={styles.textTabView}>Pengambalian</Text>
        <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={item => item.nim}
        />
      </View>
    </PagerView>
        {/* <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={item => item.nim}
        /> */}
      </View>
      <Button
          style={styles.buttonCetak}
          mode="contained"
          // onPress={handlePresentModalPress}
          >
          Cetak
        </Button>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        style={styles.bottomSheetStyle}>
        <View style={styles.contentContainer}>
          <Text style={styles.bottomSheetTitle}>Tambah Buku</Text>
          <Formik
            initialValues={{
              name: '',
              nis: '',
              dob: '',
              email: '',
              address: '',
            }}
            onSubmit={onSubmit}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.formWrapper}>
                <TextInput
                  onChangeText={handleChange('nama')}
                  onBlur={handleBlur('nama')}
                  value={values.name}
                  mode="outlined"
                  label="Nama"
                  returnKeyType="next"
                  autoCapitalize="none"
                />
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
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('don')}
                  value={values.dob}
                  mode="outlined"
                  label="Tanggal Lahir"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  mode="outlined"
                  label="Email"
                  returnKeyType="next"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.space}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  mode="outlined"
                  label="Alamat"
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

export default ReportScreen;
