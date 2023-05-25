import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {Container, BottomSheet} from '@components';
import {Row,Rows,Table} from 'react-native-table-component'
import {
  List,
  Menu, 
  IconButton,
  Searchbar,
  Button,
  TextInput,
} from 'react-native-paper';
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
          title={`Buku ${index}`}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      );
    },
    [renderLeftListItem, renderRightListItem],
  );

  const tableHead=['No','NIS','Nama Siswa','Tgl Pinjam','Tgl Kembali','Status']
  const tableData=[
    ['1','123123','Rizki','17-17-99','18-18-20','Done'],
    ['2','123123','Rizki','17-17-99','18-18-20','Done'],
    ['3','123123','Rizki','17-17-99','18-18-20','Done'],
  ]
  return (
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
      <Table borderStyle={{borderWidth:1, borderColor:'#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        {/* <FlatList
          data={listMember}
          renderItem={renderItem}
          keyExtractor={item => item.nim}
        /> */}
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
