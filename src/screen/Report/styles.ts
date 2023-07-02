import {lightTheme} from '@constants';
import {aspectRatio} from '@utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // padding: aspectRatio(20),
  },
  pagerView: {
    flex: 1,
    margin:5,
    // backgroundColor:lightTheme.primary,
    borderRadius:20
  },
  tabView:{
    margin:10,
    borderRadius:20,
    backgroundColor:lightTheme.primary
  },
  textTabView:{
    margin:10,
    borderRadius:20,
    fontSize:20
  },
  topBody: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  bottomBody: {
    flex: 6,
    margin:20
  },
  buttonAdd: {
    marginTop: aspectRatio(10),
    width: aspectRatio(100),
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
  },
  buttonCetak: {
    marginTop: aspectRatio(10),
    marginBottom: aspectRatio(20),
    width: aspectRatio(150),
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
    alignSelf:'center'
  },
  buttonTgl: {
    marginTop: aspectRatio(10),
    width: aspectRatio(300),
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    margin:20
  },
  formWrapper: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
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
  textHead:{
    margin:6,
    fontSize:12,
    fontWeight:'bold'
  },
  text:{
    margin:6
  },
  head:{
    height:40,
    backgroundColor:'#f1f8ff'
  }
});

export default styles;
