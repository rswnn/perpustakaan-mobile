import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {Container} from '@components';
import {Button, TextInput} from 'react-native-paper';
import {aspectRatio} from '@utils';
import {useAppDispatch} from '@hooks';
import {action} from '@store';

const LoginScreen = () => {
  const setLogin = useAppDispatch(action.AuthAction.setLoginAction);

  const onSubmit = () => {
    setLogin();
  };

  return (
    <Container>
      <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.formWrapper}>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              mode="outlined"
              label="Email"
              returnKeyType="next"
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.space}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              mode="outlined"
              label="Password"
              returnKeyType="done"
              secureTextEntry
            />
            <Button style={styles.space} onPress={handleSubmit}>
              Login
            </Button>
          </View>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  space: {
    marginTop: aspectRatio(15),
  },
  formWrapper: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: aspectRatio(20),
  },
});

export default LoginScreen;
