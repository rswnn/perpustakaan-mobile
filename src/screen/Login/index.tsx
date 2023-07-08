import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {Container} from '@components';
import {Button, TextInput} from 'react-native-paper';
import {aspectRatio} from '@utils';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {action} from '@store';
import {AuthResponseType} from '@interfaces';

const {AuthAction} = action;

const LoginScreen = () => {
  const {loading} = useTypedSelector<AuthResponseType>('auth');
  const setLogin = useAppAsyncDispatch(AuthAction.loginAction);

  const onSubmit = (param: any) => {
    setLogin({
      payload: {...param},
    });
  };

  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={{identifier: '', password: ''}}
          onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formWrapper}>
              <TextInput
                onChangeText={handleChange('identifier')}
                onBlur={handleBlur('identifier')}
                value={values.identifier}
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
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </React.Fragment>
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default LoginScreen;
