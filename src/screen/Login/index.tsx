import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {Container} from '@components';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {aspectRatio} from '@utils';
import {useAppAsyncDispatch, useTypedSelector} from '@hooks';
import {action} from '@store';
import {AuthResponseType} from '@interfaces';

const {AuthAction} = action;

const LoginScreen = () => {
  const {loading} = useTypedSelector<AuthResponseType>('auth');
  const setLoginStudent = useAppAsyncDispatch(AuthAction.studentLoginAction);
  const setLoginTeacher = useAppAsyncDispatch(AuthAction.teacherLoginAction);

  const onSubmit = async (param?: any) => {
    console.log(param, 'PARAM PARAM');
    try {
      if (param.loginType === 'guru') {
        await setLoginTeacher({
          payload: {
            nip: param.username,
            password: param.password,
            loginType: param.loginType,
          },
        });
      } else {
        await setLoginStudent({
          payload: {
            nis: param.username,
            password: param.password,
            loginType: param.loginType,
          },
        });
      }
    } catch (error) {
      console.log(error, 'BLOGGGG');
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={{username: '', password: '', loginType: 'guru'}}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View style={styles.formWrapper}>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values?.username}
                mode="outlined"
                label="NIP / NIS"
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
              <RadioButton.Group
                onValueChange={value => setFieldValue('loginType', value)}
                value={values.loginType}>
                <RadioButton.Item
                  value="guru"
                  status={values.loginType === 'guru' ? 'checked' : 'unchecked'}
                  label="Guru"
                />
                <RadioButton.Item
                  value="siswa"
                  status={
                    values.loginType === 'siswa' ? 'checked' : 'unchecked'
                  }
                  label="Siswa"
                />
              </RadioButton.Group>

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
