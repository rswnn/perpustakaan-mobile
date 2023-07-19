import {lightTheme} from '@constants';
import {aspectRatio} from '@utils';
import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    // padding: aspectRatio(20),
  },
  topBody: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  bottomBody: {
    flex: 4,
    margin: 20,
  },
  buttonAdd: {
    marginTop: aspectRatio(10),
    width: aspectRatio(100),
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  contentContainer: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: aspectRatio(20),
  },
  space: {
    marginTop: aspectRatio(10),
  },
  bottomSheetStyle: {
    padding: aspectRatio(10),
  },
  btnSave: {
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
  },
  bottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: aspectRatio(14),
    color: lightTheme.black,
    marginBottom: aspectRatio(10),
  },
  textHead: {
    margin: 6,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    margin: 6,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  pickerStyle: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: DefaultTheme.colors.background,
  },
});

export default styles;
