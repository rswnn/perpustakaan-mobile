/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet, Text} from 'react-native';
import useStudentDetail from './useStudentDetail';
// import {StudentData} from '@components';
// import {List} from 'react-native-paper';
// import {List} from 'react-native-paper';
// import {useCallback} from 'react';
// import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {StudentData} from '@components';

const StudentDetailScreen = ({route}: any) => {
  const {student} = useStudentDetail({
    nis: route.params.nis,
  });

  // console.log(data, 'DATA');
  console.log(route.params.nis, 'route.params.nis,');
  console.log(student, 'ROUTE STUDENT DETAIL');
  console.log(student?.students, 'STUDENT');
  // console.log(student?.classrooms[0], 'STUCENT');

  return (
    <View style={styles.centerFlex}>
      <StudentData nama={student?.fullName} />
      <View style={(styles.containerButton, styles.surahList)}>
        <Text style={styles.subtitle}>Daftar Hafalan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerFlex: {
    padding: 10,
    flex: 1,
  },
  widthFull: {
    width: '100%',
    // marginBottom: 10,
  },
  borderBottom: {
    borderBottomColor: 'black',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  containerButton: {
    width: '100%',
    marginBottom: 150,
  },
  subtitle: {
    color: 'black',
    marginVertical: 10,
  },
  surahList: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginVertical: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default StudentDetailScreen;
