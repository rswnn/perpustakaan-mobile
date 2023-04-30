import {StyleSheet} from 'react-native';
import {lightTheme} from '@constants';

import {aspectRatio} from '@utils';

const styles = StyleSheet.create({
  topBody: {
    flex: 1,
    backgroundColor: lightTheme.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomBody: {
    flex: 2,
    padding: aspectRatio(10),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: aspectRatio(10),
    height: aspectRatio(130), // approximate a square
    backgroundColor: lightTheme.white,
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: lightTheme.black,
    marginTop: aspectRatio(10),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
});

export default styles;
