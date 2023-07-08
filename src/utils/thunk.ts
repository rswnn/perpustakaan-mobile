import {createAsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import {apiCall} from './api';

type ThunkUtilsType = {
  type: string;
  queryParam?: Record<any, any>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  onSuccess?: (param: {
    response: any;
    dispatch: ThunkDispatch<any, any, any>;
  }) => any;
  onFailed?: (param: {
    error: unknown;
    dispatch: ThunkDispatch<any, any, any>;
  }) => any;
  endpoint: string;
  payload?: Record<any, any>;
};

export const thunkUtils = ({
  type,
  method,
  onSuccess,
  onFailed,
  endpoint,
}: ThunkUtilsType) => {
  return createAsyncThunk(type, async (payload: any, thunkAPI) => {
    try {
      const response = await apiCall({
        endpoint,
        method,
        payload: payload?.payload,
      });
      if (onSuccess) {
        onSuccess({
          response,
          dispatch: thunkAPI.dispatch,
        });
      }
      return {
        ...response,
        ...payload,
      };
    } catch (error) {
      if (onFailed) {
        onFailed({
          error,
          dispatch: thunkAPI.dispatch,
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  });
};
