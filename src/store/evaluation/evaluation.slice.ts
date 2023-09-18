import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {DetailTaskState} from '@interfaces';
import {getDetailTaskAction} from './evaluation.thunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {isEmpty} from 'lodash';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: DetailTaskState = {
  detailTask: [],
  loadingTaskDetail: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByNis: '',
};

export const evaluationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleGetDetailTaskAction: (state, action) => {
      state.searchByNis = action.payload.data.searchByNis;
    },
  },
  extraReducers: builder => {
    // console.log(builder, 'BUILDER');
    builder.addCase(getDetailTaskAction.fulfilled, (state, action) => {
      state.loadingTaskDetail.get = false;
      state.detailTask = action.payload.data;
    });
    // builder.addCase(getCategoryByIdAction.fulfilled, (state, action) => {
    //   state.loadingTaskDetail.get = false;
    //   state.data = action.payload.data;
    // });
    builder.addMatcher(
      isAnyOf(getDetailTaskAction.rejected),
      (state, action) => {
        state.loadingTaskDetail = {...initialState.loadingTaskDetail};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(getDetailTaskAction.pending),
      (state, action) => {
        state.loadingTaskDetail = {
          get: getDetailTaskAction.pending.type === action.type,
          add: false,
          edit: false,
          delete: false,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {handleGetDetailTaskAction} = evaluationSlice.actions;
