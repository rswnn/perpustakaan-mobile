import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import {StudentData} from '@components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {TaskState} from '@interfaces';
import {action} from '@store';
import {baseUrl} from '../../config';

const audioRecorderPlayer = new AudioRecorderPlayer();
// import useCategory from '../CategoryTask/useCategory';

const ResultTaskScreen = ({route}: any) => {
  const {listTasks, taskResult} = useTypedSelector<TaskState>('hafalan');
  const [isPausePlay, setIsPausePlay] = useState(false);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  const filterTask = useMemo(() => {
    return listTasks.find(item => item.id === route.params.taskID);
  }, [route, listTasks]);

  const fetchTaskByNisAndId = useAppAsyncDispatch(
    action.TaskAction.getTaskByNisAndTaskId,
  );

  const gardingTask = useAppAsyncDispatch(action.TaskAction.gradingTaskACtion);

  const onPressSendGrade = async () => {
    await gardingTask({
      payload: {
        param: `${taskResult?.id}/${route.params.nis}`,
        grade: Number(text),
      },
    });
    onFetchTaskByNisAndId();
  };

  const onFetchTaskByNisAndId = useCallback(async () => {
    // console.log(`${route.params.taskID}/${route.params.nis}`, 'tested');
    try {
      await fetchTaskByNisAndId({
        payload: {
          param: `${route.params.taskID}/${route.params.nis}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [route, fetchTaskByNisAndId]);

  const onStartPlay = async () => {
    const uri = baseUrl + '/audio/' + taskResult?.record;
    const rnFetchBlob = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', uri);
    const filepath = rnFetchBlob.path();

    await audioRecorderPlayer.startPlayer(filepath);
    audioRecorderPlayer.addPlayBackListener(event => {
      if (event.currentPosition === event.duration) {
        setIsPausePlay(false);
      }
    });
    setIsPausePlay(true);
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPausePlay(false);
  };

  useEffect(() => {
    onFetchTaskByNisAndId();
  }, [onFetchTaskByNisAndId]);

  useEffect(() => {
    if (taskResult && taskResult.grade) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [taskResult]);

  return (
    <View style={styles.centerFlex}>
      <StudentData
        nama={route.params.studentName}
        kelas={route?.params?.class ?? ''}
      />
      <View style={(styles.containerButton, styles.surahList, styles.marbot)}>
        <Text style={styles.subtitle}> Hafalan</Text>
      </View>
      <View style={[styles.audioWrapper, styles.marbot]}>
        <Text style={[styles.subtitle, styles.textCenter]}>
          {filterTask?.title}
        </Text>
        <Pressable
          style={styles.iconWrapper}
          onPress={isPausePlay ? onPausePlay : onStartPlay}>
          <MaterialIcon
            name={isPausePlay ? 'pause' : 'play-arrow'}
            size={70}
            color={'#000'}
          />
        </Pressable>
      </View>
      <View style={(styles.containerButton, styles.surahList, styles.marbot)}>
        {taskResult?.grade ? (
          <React.Fragment>
            <Text style={styles.subtitle}> Nilai {taskResult.grade}</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text style={styles.subtitle}> Form Nilai</Text>
            <TextInput
              label="Nilai"
              value={text}
              onChangeText={e => setText(e)}
              keyboardType="numeric"
            />
          </React.Fragment>
        )}
      </View>
      <View style={styles.btnWrapper}>
        {!taskResult?.grade ? (
          <Button
            mode="contained"
            style={styles.btn}
            onPress={onPressSendGrade}>
            BERI PENILAIAN
          </Button>
        ) : null}
      </View>
      <Snackbar onDismiss={() => setVisible(false)} visible={visible}>
        Hafalan Telah Di Nilai
      </Snackbar>
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
  textCenter: {
    textAlign: 'center',
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
  marbot: {
    marginBottom: 10,
  },
  audioWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#dadada',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 70,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  btn: {borderRadius: 0, padding: 10},
});

export default ResultTaskScreen;
