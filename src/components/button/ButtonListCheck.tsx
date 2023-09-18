/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonCustom from './ButtonCustom';
import TextCustom from '../text/TextCustom';

const ButtonListCheck = (props: any) => {
  const {data, accessor, handlePress} = props;
  return (
    <View style={styles.containerButton}>
      {data.length !== 0 ? (
        data.map((value: any, index: any) => (
          <ButtonCustom
            key={index}
            onPress={() => handlePress(value)}
            style={styles.listButton}>
            <TextCustom>{value[accessor]}</TextCustom>
            <Icon
              name="check-circle"
              size={22}
              color={value.status ? 'green' : 'grey'}
            />
          </ButtonCustom>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  listButton: {
    flex: 1,
    marginVertical: 5,
    height: 50,
    borderRadius: 30,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

ButtonListCheck.propTypes = {
  data: PropTypes.array,
  accessor: PropTypes.string,
  handlePress: PropTypes.func,
};

ButtonListCheck.defaultProps = {
  handlePress: console.log('button pressed'),
};

export default ButtonListCheck;
