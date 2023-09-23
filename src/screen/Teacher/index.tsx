/* eslint-disable react/react-in-jsx-scope */
// import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import useTeacher from './useTeacher';
import {ButtonCustom, TextCustom} from '@components';

const TeacherScreen = () => {
  const {handlePressTeacherById, teacher, renderTeacher} = useTeacher();
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    try {
      await setRefresh(true);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  const renderContent = () => {
    if (renderTeacher) {
      return (
        <FlatList
          data={teacher}
          refreshing={refresh}
          onRefresh={() => onRefresh()}
          renderItem={({item}) => (
            <ButtonCustom
              style={styles.button}
              key={item.attributes.nip}
              onPress={() => handlePressTeacherById(teacher)}>
              <TextCustom>{item.attributes.fullName}</TextCustom>
            </ButtonCustom>
          )}
          keyExtractor={item => item.attributes.fullName}
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
    // backgroundColor: 'red'
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

export default TeacherScreen;
