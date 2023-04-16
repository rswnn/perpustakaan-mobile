import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@store';

// need default type response
import {
  ActionCreatorWithPayload,
  AsyncThunk,
  AsyncThunkAction,
  unwrapResult,
} from '@reduxjs/toolkit';

export const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    <R>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch],
  );
};

const useAppDispatch = <T, K = any>(
  action: ActionCreatorWithPayload<K, any>,
) => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (params?: any | T) => dispatch(action({...params})),
    [dispatch, action],
  );
};

const useAppAsyncDispatch = <T>(action: AsyncThunk<any, any, any>) => {
  const unwrap = useUnwrapAsyncThunk();

  return useCallback(
    (params?: any | T) =>
      unwrap(action({...params}) as AsyncThunkAction<any, any, any>),
    [unwrap, action],
  );
};

export {useAppDispatch, useAppAsyncDispatch};
