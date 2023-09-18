/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const ButtonLists = (props: any) => {
  const {data, accessor, handlePress, styleButton} = props;
  return (
    <View style={[styles.containerButton, styleButton]}>
      {data.length !== 0 ? (
        data.map((value: any, index: any) => (
          <ButtonStyled
            key={index}
            text={value[accessor]}
            onPress={() => handlePress(value)}
          />
        ))
      ) : (
        <View>
          <Text>Data Tidak Ditemukan</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
});

ButtonLists.propTypes = {
  data: PropTypes.array,
  accessor: PropTypes.string,
  handlePress: PropTypes.func,
  styleButton: PropTypes.object,
};

export default ButtonLists;
