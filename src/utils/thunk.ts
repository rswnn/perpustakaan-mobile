// import {createAsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
// import {generateQueryString} from 'helpers';
// import {Pagination, RequestOptionGenericType, ResponseType} from 'interface';
// import {apiCall} from './api';

// type ThunkUtilsType = {
//   type: string;
//   queryParam?: Record<any, any>;
//   pagination?: Pagination;
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   onSuccess?: (param: {
//     response: ResponseType<any>;
//     dispatch: ThunkDispatch<any, any, any>;
//   }) => any;
//   onFailed?: (param: {
//     error: unknown;
//     dispatch: ThunkDispatch<any, any, any>;
//   }) => any;
//   endpoint: string;
//   payload?: Record<any, any>;
// };

// export const thunkUtils = <T, K = void>({
//   type,
//   method,
//   queryParam,
//   pagination,
//   onSuccess,
//   onFailed,
//   endpoint,
// }: ThunkUtilsType) => {
//   return createAsyncThunk(
//     type,
//     async (payload: RequestOptionGenericType<K> | void, thunkAPI) => {
//       try {
//         const safeQueryParam = payload?.queryParam
//           ? payload.queryParam
//           : queryParam
//           ? queryParam
//           : {};
//         const safePagination = payload?.pagination
//           ? payload.pagination
//           : pagination
//           ? pagination
//           : {};
//         const safeEndpoint = payload?.id
//           ? `${endpoint}/${payload.id}`
//           : endpoint;
//         const response = await apiCall<T>({
//           endpoint: `${safeEndpoint}?${generateQueryString({
//             ...safeQueryParam,
//             ...safePagination,
//           })}`,
//           method,
//           payload: payload?.payload,
//         });
//         if (onSuccess) {
//           onSuccess({
//             response,
//             dispatch: thunkAPI.dispatch,
//           });
//         }
//         return {
//           ...response,
//           ...payload,
//         };
//       } catch (error) {
//         if (onFailed) {
//           onFailed({
//             error,
//             dispatch: thunkAPI.dispatch,
//           });
//         }
//         return thunkAPI.rejectWithValue(error);
//       }
//     },
//   );
// };

const thunkUtils = {};

export {thunkUtils};
