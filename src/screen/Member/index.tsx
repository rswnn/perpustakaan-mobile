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
import useMember from './useMember';
import {Formik} from 'formik';
import styles from './styles';
import {Member} from '@interfaces';
import {useTypedSelector} from '@hooks';

const MemberScreen = () => {
  const {
    member,
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
    handleDeleteMember,
  } = useMember();

  const {loading} = useTypedSelector<Member>('anggotas');

  const renderLeftListItem = useCallback((props: any) => {
    return <List.Icon {...props} icon="account" />;
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
      return (
        <List.Accordion
          key={item.attributes.nis}
          title={item.attributes.nama_siswa}
          description={item.attributes.nis}
          left={props => renderLeftListItem(props)}
          right={() => renderRightListItem(item, index)}>
          <List.Item
            title={`Jenis Kelamin : ${item.attributes.jenis_kelamin}`}
          />
          <List.Item title={`Alamat : ${item.attributes.alamat}`} />
          <List.Item title={`No Hp : ${item.attributes.no_hp}`} />
          <Pressable onPress={() => handleDeleteMember(item.id)}>
            <List.Icon
              icon="delete"
              style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 20}}
            />
          </Pressable>

          {/* <Pressable onPress={() => handleDeleteMember(item.id)}>
            <List.Icon
              icon="delete"
              style={{alignSelf: 'flex-start', marginRight: 30}}
            />
          </Pressable> */}
        </List.Accordion>
      );
    },
    [renderRightListItem, renderLeftListItem, handleDeleteMember],
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
            data={member}
            renderItem={renderItem}
            keyExtractor={item => item.attributes.nis}
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          handleSheetChanges={handleSheetChanges}
          style={styles.bottomSheetStyle}>
          <View style={styles.contentContainer}>
            <Text style={styles.bottomSheetTitle}>Tambah Anggota</Text>
            <Formik
              initialValues={{
                nama_siswa: '',
                nis: '',
                tgl_lahir: '',
                tempat_lahir: '',
                no_hp: '',
                jenis_kelamin: '',
                alamat: '',
              }}
              onSubmit={onSubmit}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.formWrapper}>
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('nama_siswa')}
                    onBlur={handleBlur('nama_siswa')}
                    value={values.nama_siswa}
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
                    onChangeText={handleChange('tgl_lahir')}
                    onBlur={handleBlur('tgl_lahir')}
                    value={values.tgl_lahir}
                    mode="outlined"
                    label="Tanggal Lahir"
                    returnKeyType="next"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('tempat_lahir')}
                    onBlur={handleBlur('tempat_lahir')}
                    value={values.tempat_lahir}
                    mode="outlined"
                    label="Tempat Lahir"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('no_hp')}
                    onBlur={handleBlur('no_hp')}
                    value={values.no_hp}
                    mode="outlined"
                    label="No Hp"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('jenis_kelamin')}
                    onBlur={handleBlur('jenis_kelamin')}
                    value={values.jenis_kelamin}
                    mode="outlined"
                    label="Jenis Kelamin"
                    returnKeyType="next"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.space}
                    onChangeText={handleChange('alamat')}
                    onBlur={handleBlur('alamat')}
                    value={values.alamat}
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

      {loading && (
        <View style={styles.container}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </React.Fragment>
  );
};

export default MemberScreen;
