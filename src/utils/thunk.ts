import {createAsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import {apiCall} from './api';
import _ from 'lodash';

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
      const param = _.get(payload, 'payload.param', '');

      const response = await apiCall({
        endpoint: `${endpoint}${param}`,
        method,
        payload: payload?.payload,
      });
      if (onSuccess) {
        onSuccess({
          response,
          dispatch: thunkAPI.dispatch,
        });
      }
      const payloadResponse = _.isEmpty(payload) ? {} : payload;
      return {
        ...response,
        ...payloadResponse,
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
