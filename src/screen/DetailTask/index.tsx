import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {AuthResponseType, TaskState} from '@interfaces';
import {Container} from '@components';
import {Button, Text} from 'react-native-paper';
import {imageUrl} from '../../config';
import {action} from '@store';
import {baseUrl} from '../../config';

const audioRecorderPlayer = new AudioRecorderPlayer();

const DetailTask = ({navigation, route}: any) => {
  const {taskResult} = useTypedSelector<TaskState>('hafalan');
  const {user} = useTypedSelector<AuthResponseType>('auth');

  const [isPausePlay, setIsPausePlay] = useState(false);

  const {selectedTask} = route.params;

  const fetchTaskByNisAndId = useAppAsyncDispatch(
    action.TaskAction.getTaskByNisAndTaskId,
  );

  const onFetchTaskByNisAndId = useCallback(async () => {
    if (selectedTask) {
      await fetchTaskByNisAndId({
        payload: {
          param: `${selectedTask.id}/${user.nis}`,
        },
      });
    }
  }, [selectedTask, user, fetchTaskByNisAndId]);

  useEffect(() => {
    onFetchTaskByNisAndId();
  }, [onFetchTaskByNisAndId]);

  const onPressStartTask = useCallback(() => {
    navigation.navigate('AudioScreen');
  }, [navigation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const renderTaskResult = useMemo(() => {
    if (taskResult && taskResult.record) {
      return (
        <View style={styles.btnWrapper}>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', alignItems: 'center'},
            ]}>
            <View style={[styles.row, {marginRight: 30}]}>
              <Text
                style={styles.textHeader}
                allowFontScaling
                variant="headlineSmall">
                NILAI :
              </Text>
              <Text
                style={styles.textHeader}
                allowFontScaling
                variant="headlineSmall">
                {taskResult.grade ?? '100'}
              </Text>
            </View>
            <View>
              <Pressable
                style={styles.iconWrapper}
                onPress={isPausePlay ? onPausePlay : onStartPlay}>
                <MaterialIcon
                  name={isPausePlay ? 'pause' : 'play-arrow'}
                  size={50}
                  color={'#000'}
                />
              </Pressable>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.btnStartTask}>
        <Button mode="contained" style={styles.btn} onPress={onPressStartTask}>
          MULAI HAFALAN
        </Button>
      </View>
    );
  }, [taskResult, onPressStartTask, isPausePlay, onStartPlay]);

  const renderContent = useMemo(() => {
    return (
      <View style={styles.flex}>
        <Text
          style={styles.textHeader}
          allowFontScaling
          variant="headlineSmall">
          {selectedTask?.title}
        </Text>
        <ScrollView>
          <Image
            source={{uri: `${imageUrl}${selectedTask?.image_media}`}}
            style={styles.image}
          />
        </ScrollView>
        {renderTaskResult}
      </View>
    );
  }, [selectedTask, renderTaskResult]);

  return <Container customStyle={styles.container}>{renderContent}</Container>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 0,
  },
  flex: {
    flex: 1,
  },
  textHeader: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {width: Dimensions.get('window').width, minHeight: 400},
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  btnStartTask: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {borderRadius: 0, padding: 10},
  row: {display: 'flex', flexDirection: 'row'},
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#dadada',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default DetailTask;
