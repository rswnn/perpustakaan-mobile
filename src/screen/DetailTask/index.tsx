import {View, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useTypedSelector} from '@hooks';
import {TaskState} from '@interfaces';
import {Container} from '@components';
import {Button, Text} from 'react-native-paper';
import {imageUrl} from '../../config';

const DetailTask = ({navigation}: any) => {
  const {tasks} = useTypedSelector<TaskState>('hafalan');

  const onPressStartTask = useCallback(() => {
    navigation.navigate('AudioScreen');
  }, [navigation]);

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
          <ScrollView>
            <Image
              source={{uri: `${imageUrl}${tasks[0].image_media}`}}
              style={styles.image}
            />
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button
              mode="contained"
              style={styles.btn}
              onPress={onPressStartTask}>
              MULAI HAFALAN
            </Button>
          </View>
        </View>
      );
    }

    return null;
  }, [tasks, onPressStartTask]);

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
  image: {width: '100%', minHeight: 400},
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {borderRadius: 0, padding: 10},
});

export default DetailTask;
