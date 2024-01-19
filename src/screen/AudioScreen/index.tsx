import {View, StyleSheet, Pressable, Platform} from 'react-native';
import React, {useState} from 'react';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import uuid from 'react-native-uuid';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTypedSelector} from '@hooks';
import {AuthResponseType} from '@interfaces';
import {Container} from '@components';
import {Text, Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {baseUrl} from '../../config';

const audioRecorderPlayer = new AudioRecorderPlayer();
const initialColor = '#000';

const AudioScreen = ({navigation, route}: any) => {
  const {selectedTask, onGoback} = route.params;
  const {user} = useTypedSelector<AuthResponseType>('auth');

  let audioRef = React.useRef<any>(null);

  const [audio, setAudio] = useState({recordSecs: 0, recordTime: ''});
  const [recordColor, setRecordColor] = useState(initialColor);
  const [available, setAvailable] = useState(false);
  const [isPausePlay, setIsPausePlay] = useState(false);
  const [recordPath, setRecordPath] = useState<any>('');

  const onStartRecord = async () => {
    setRecordPath('');
    try {
      if (!audio.recordSecs && !audio.recordTime) {
        const dirs = RNFetchBlob.fs.dirs;
        const path = Platform.select({
          ios: 'hello.m4a',
          android: `${dirs.CacheDir}/${uuid.v4()}.mp3`,
        });
        await audioRecorderPlayer.startRecorder(path, {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
        });
        audioRef.current = path;
        setRecordColor('#ff0000');
        audioRecorderPlayer.addRecordBackListener(e => {
          setAudio({
            recordSecs: e.currentPosition,
            recordTime: audioRecorderPlayer.mmssss(
              Math.floor(e.currentPosition),
            ),
          });
          return;
        });
        setAvailable(false);
        setIsPausePlay(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onResetAudio = () => {
    setAudio({
      recordSecs: 0,
      recordTime: '',
    });
  };

  const onStopRecord = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      setRecordColor(initialColor);
      audioRecorderPlayer.removeRecordBackListener();
      onResetAudio();
      setAvailable(true);
      if (audioRef.current) {
        setRecordPath(audioRef.current);
      }
    } catch (error) {}
  };

  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(recordPath);
    audioRecorderPlayer.addPlayBackListener(event => {
      if (event.currentPosition === event.duration) {
        setIsPausePlay(false);
        onResetAudio();
      }
    });
    setIsPausePlay(true);
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPausePlay(false);
  };

  const onPressSend = async () => {
    try {
      const formData = new FormData();
      const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
      if (selectedTask && audioRef.current && cacheDir) {
        const userToken = await AsyncStorage.getItem('token');
        const currentPath = audioRef.current.split('/');
        const filename = currentPath[currentPath.length - 1];
        const taskID = selectedTask.id;
        const uri = 'file://' + cacheDir + '/' + filename;

        formData.append('hafalan_id', taskID);
        formData.append('nis', user.nis);
        formData.append('record', {
          name: filename,
          uri,
          type: 'audio/mp3',
        });

        const response = await fetch(
          baseUrl + '/api/detail-hafalan/submission',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          },
        );

        console.log(response, 'mueheheheheh');

        navigation.goBack();
        onGoback();
      }
    } catch (error) {
      console.log(error, '[onPressSend]');
    }
  };

  const renderStopIcon = () => {
    if (available) {
      return (
        <Pressable
          style={styles.iconWrapper}
          onPress={isPausePlay ? onPausePlay : onStartPlay}>
          <MaterialIcon
            name={isPausePlay ? 'pause' : 'play-arrow'}
            size={50}
            color={initialColor}
          />
        </Pressable>
      );
    }
    if (audio.recordSecs > 2000) {
      return (
        <Pressable style={styles.iconWrapper} onPress={onStopRecord}>
          <MaterialIcon name="stop" size={50} color={initialColor} />
        </Pressable>
      );
    }
  };

  const disableButton = () => {
    return !recordPath;
  };

  const renderContent = () => {
    if (selectedTask) {
      return (
        <React.Fragment>
          <View style={styles.flex}>
            <Text
              style={styles.textHeader}
              allowFontScaling
              variant="headlineSmall">
              {selectedTask?.title}
            </Text>
            <View style={styles.recordWrapper}>
              <Text
                style={styles.textHeader}
                allowFontScaling
                variant="bodyMedium">
                Tekan untuk memulai
              </Text>
              <Pressable style={styles.iconWrapper} onPress={onStartRecord}>
                <MaterialIcon
                  name="keyboard-voice"
                  size={50}
                  color={recordColor}
                />
              </Pressable>
              {renderStopIcon()}
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              mode="contained"
              style={styles.btn}
              disabled={disableButton()}
              onPress={onPressSend}>
              KIRIM
            </Button>
          </View>
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <Container customStyle={styles.container}>{renderContent()}</Container>
  );
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
