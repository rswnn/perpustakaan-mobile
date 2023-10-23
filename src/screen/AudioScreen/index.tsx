import {View, StyleSheet, Pressable} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useTypedSelector} from '@hooks';
import {TaskState} from '@interfaces';
import {Container} from '@components';
import {Text, Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AudioScreen = ({navigation}: any) => {
  const {tasks} = useTypedSelector<TaskState>('hafalan');

  const renderContent = useMemo(() => {
    if (tasks && tasks.length) {
      return (
        <View style={styles.flex}>
          <Text
            style={styles.textHeader}
            allowFontScaling
            variant="headlineSmall">
            {tasks[0].title}
          </Text>
          <View style={styles.recordWrapper}>
            <Text
              style={styles.textHeader}
              allowFontScaling
              variant="bodyMedium">
              Tekan untuk memulai
            </Text>
            <Pressable style={styles.iconWrapper}>
              <MaterialIcon name="keyboard-voice" size={50} color="#000" />
            </Pressable>
          </View>
          <View style={styles.btnWrapper}>
            <Button mode="contained" style={styles.btn}>
              KIRIM
            </Button>
          </View>
        </View>
      );
    }

    return null;
  }, [tasks]);

  return <Container customStyle={styles.container}>{renderContent}</Container>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 0,
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  textHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  recordWrapper: {
    marginTop: '30%',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#dadada',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  btn: {borderRadius: 0, padding: 10},
});

export default AudioScreen;
