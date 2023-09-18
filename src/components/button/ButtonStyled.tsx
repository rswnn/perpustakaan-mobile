/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ButtonStyled = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.listButton, props.containerStyle]}
      onPress={props.onPress}>
      <Text style={[styles.textButton, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listButton: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    backgroundColor: '#E5E5E5',
    margin: 2,
  },
  textButton: {
    color: 'black',
  },
});

ButtonStyled.propTypes = {
  text: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default ButtonStyled;
