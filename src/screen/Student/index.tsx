/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import useStudent from './useStudent';
import {ButtonCustom, TextCustom} from '@components';

const StudentScreen = ({route, navigation}: any) => {
  console.log(route, 'ROUTES');
  const {student} = useStudent({classId: route.params.classId});
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    try {
      await setRefresh(true);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  const handlePressStudent = async (value: any) => {
    console.log(value, 'VALUESSS 1');
    try {
      navigation.navigate('studentDetailScreen', {
        nis: value?.nis,
      });
    } catch (error) {
      console.log(error, 'HANDLE PRESS CLASS ERROR');
    }
  };

  const renderContent = () => {
    if (student?.students && student.students.length) {
      return (
        <FlatList
          data={student.students}
          refreshing={refresh}
          onRefresh={() => onRefresh()}
          renderItem={({item}) => (
            <ButtonCustom
              style={styles.button}
              key={item.nis}
              onPress={() => handlePressStudent(item)}>
              <TextCustom>{item.fullName}</TextCustom>
            </ButtonCustom>
          )}
          keyExtractor={item => item.fullName}
        />
      );
    }
  };
  return (
    <View style={[styles.center, styles.flex, styles.container]}>
      <View style={styles.containerListButton}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    height: 100,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  containerListButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  containerButton: {
    width: '100%',
    marginTop: 10,
    // marginBottom: 10,
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

export default StudentScreen;
