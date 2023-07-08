import {AuthResponseType, UserType} from '@interfaces';
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash/isEmpty';

import {loginAction} from './auth.thunk';

const initialState: AuthResponseType = {
  jwt: '',
  user: {} as UserType,
  isLoggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogoutAction: state => {
      state.isLoggedIn = false;
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.user = action.payload.user as UserType;
      AsyncStorage.setItem('token', action.payload.jwt);
      state.isLoggedIn = !isEmpty(action.payload.jwt);
    });
    builder.addCase(loginAction.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginAction.rejected, state => {
      state.error = 'Terjadi kesalahan';
      state.loading = false;
    });
  },
});

export const {setLogoutAction} = authSlice.actions;
