/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const StudentData = (props: any) => {
  const {nama, kelas} = props;
  return (
    <View style={[styles.containerStudentData, styles.borderBottom]}>
      <View style={styles.studentData}>
        <Text style={styles.textData}>Nama</Text>
        <Text style={styles.textData}>{nama}</Text>
      </View>
      <View style={styles.studentData}>
        <Text style={styles.textData}>Kelas</Text>
        <Text style={styles.textData}>{kelas}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: 'black',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  containerStudentData: {
    width: '100%',
  },
  studentData: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textData: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
});

StudentData.propTypes = {
  nama: PropTypes.string,
  kelas: PropTypes.string,
};

export default StudentData;
