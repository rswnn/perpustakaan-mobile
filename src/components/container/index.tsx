import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ContainerType = {
  children: React.ReactNode;
};

const Container = ({children}: ContainerType) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={[backgroundStyle, styles.background]}>
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
    padding: 20,
    width: '100%',
    backgroundColor: '#ffffff',
  },
});

export default Container;
