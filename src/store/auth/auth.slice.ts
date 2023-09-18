import {AuthResponseType, AuthStudentType, AuthTeacherType} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {studentLoginAction, teacherLoginAction} from './auth.thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash/isEmpty';

const initialState: AuthResponseType = {
  user: {
    nip: {} as AuthTeacherType | null,
    nis: {} as AuthStudentType | null,
  },
  token: '',
  loginType: '',
  isLoggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogoutAction: state => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    // builder.addCase(
    //   (studentLoginAction.fulfilled, teacherLoginAction.fulfilled),
    //   (state, action) => {
    //     console.log(action.payload, 'STUDENT ACTION');
    //     state.loading = false;
    //     state.token = action.payload.data.token;
    //     state.user = action.payload.user as AuthStudentType | AuthTeacherType;
    //     AsyncStorage.setItem('token', action.payload.data.token);
    //     state.isLoggedIn = !isEmpty(action.payload.data.token);
    //   },
    // );
    builder.addCase(
      studentLoginAction.pending || teacherLoginAction.pending,
      state => {
        state.loading = true;
      },
    );

    builder.addCase(
      studentLoginAction.rejected || teacherLoginAction.fulfilled,
      state => {
        state.error = 'Terjadi kesalahan';
        state.loading = false;
      },
    );
    builder.addMatcher(
      isAnyOf(studentLoginAction.fulfilled, teacherLoginAction.fulfilled),
      (state, action) => {
        console.log(action, 'KONTOL');
        state.loading = false;
        state.token = action.payload.data.token;
        state.loginType = action.payload.payload.loginType;
        (state.user = {
          nip: action.payload.data?.nip as AuthTeacherType,
          nis: action.payload.data?.nis as AuthStudentType,
          // eslint-disable-next-line no-sequences
        }),
          AsyncStorage.setItem('token', action.payload.data.token);
        state.isLoggedIn = !isEmpty(action.payload.data.token);
      },
    );
  },
});

export const {setLogoutAction} = authSlice.actions;
