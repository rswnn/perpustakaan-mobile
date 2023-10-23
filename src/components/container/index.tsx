import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ContainerType = {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
};

const Container = ({customStyle, children}: ContainerType) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={[backgroundStyle, styles.background, customStyle]}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
});

export default Container;
