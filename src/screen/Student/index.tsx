/* eslint-disable react/react-in-jsx-scope */
// import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {action} from '@store';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {StudentState} from '@interfaces';
import {FlatList} from 'react-native-gesture-handler';

const {StudentAction} = action;

const StudentList = (props: any) => {
  // const theme = useTheme();
  const [refresh, setRefresh] = useState(false);
  const getStudent = useAppAsyncDispatch(StudentAction.getStudentAction);

  const {student} = useTypedSelector<StudentState>('student');

  const handlePress = (value: any) => {
    props.navigation.navigate('studentDetail', {data: value});
  };

  useEffect(() => {
    try {
      getStudent();
    } catch (error) {
      console.log(error, 'DDD');
    }
  }, [getStudent]);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  return (
    <View>
      {student !== null ? (
        <FlatList
          data={student}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.nis}
              onPress={() => handlePress(item)}
              style={[styles.container]}>
              <Text style={styles.nameText} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.nis}
          // refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => onRefresh()}
            />
          }
          onRefresh={() => onRefresh()}
        />
      ) : (
        <View>
          <Text>Data Tidak Ditemukan</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 10,
    marginHorizontal: 10,
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  nameText: {
    fontWeight: 'bold',
    color: 'black',
  },
  centerFlex: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudentList;
