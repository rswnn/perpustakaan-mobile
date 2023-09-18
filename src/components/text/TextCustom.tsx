/* eslint-disable react/react-in-jsx-scope */
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native';

const TextCustom = ({children, ...props}: any) => {
  const theme = useTheme() as any;
  return (
    <Text
      {...props}
      style={[{color: theme?.palette?.primary.contrastText}, {...props.style}]}>
      {children}
    </Text>
  );
};

export default TextCustom;
