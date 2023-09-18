import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type ButtomCustomType = TouchableOpacityProps & {
  backgroundColor: any;
  style: any;
};

const ButtonCustom = ({children, ...props}: ButtomCustomType) => {
  const theme = useTheme() as any;
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <TouchableOpacity
      {...props}
      onPress={props.onPress}
      style={[
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : theme?.palette?.primary.main,
        },
        {...props.style},
      ]}>
      {children}
    </TouchableOpacity>
  );
};

ButtonCustom.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};

export default ButtonCustom;
