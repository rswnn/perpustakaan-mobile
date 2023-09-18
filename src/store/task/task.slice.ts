import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {TaskState} from '@interfaces';
import {getTaskAction, getTaskByIdAction} from './task.thunk';
// import {isEmpty} from 'lodash';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: TaskState = {
  tasks: [],
  loadingTask: {
    get: false,
    add: false,
    delete: false,
    edit: false,
  },
  error: {},
  searchByNis: '',
};

export const taskSlice = createSlice({
  name: 'hafalan',
  initialState,
  reducers: {
    setTaskById: (state, action) => {
      state.searchByNis = action.payload.data.searchByNis;
    },
  },
  extraReducers: builder => {
    // console.log(builder, 'BUILDER');
    builder.addCase(getTaskAction.fulfilled, (state, action) => {
      state.loadingTask.get = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTaskByIdAction.fulfilled, (state, action) => {
      state.loadingTask.get = false;
      state.tasks = action.payload.data;
    });
    builder.addMatcher(
      isAnyOf(getTaskAction.rejected, getTaskByIdAction.rejected),
      (state, action) => {
        state.loadingTask = {...initialState.loadingTask};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(getTaskAction.pending, getTaskByIdAction.pending),
      (state, action) => {
        state.loadingTask = {
          get: getTaskAction.pending.type === action.type,
          add: false,
          edit: false,
          delete: false,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {setTaskById} = taskSlice.actions;
