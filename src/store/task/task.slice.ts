import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {TaskState} from '@interfaces';
import {
  getTaskAction,
  getTaskByCategoryIdAction,
  getTaskByIdAction,
  getTaskByNisAndTaskId,
  gradingTaskACtion,
} from './task.thunk';
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
  taskResult: undefined,
  listTasks: [],
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
    builder.addCase(getTaskAction.fulfilled, (state, action) => {
      state.loadingTask.get = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTaskByIdAction.fulfilled, (state, action) => {
      state.loadingTask.get = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTaskByNisAndTaskId.fulfilled, (state, action) => {
      state.loadingTask.get = false;
      // conflict
      state.taskResult = action.payload.data;
    });
    builder.addCase(getTaskByCategoryIdAction.fulfilled, (state, action) => {
      console.log('called from getCategoryByIdAction', action.payload.data);
      state.loadingTask.get = false;
      state.listTasks = action.payload.data;
    });

    builder.addCase(gradingTaskACtion.fulfilled, (state, action) => {
      console.log('called from getCategoryByIdAction', action.payload.data);
      state.loadingTask.get = false;
    });
    builder.addMatcher(
      isAnyOf(
        getTaskAction.rejected,
        getTaskByIdAction.rejected,
        getTaskByNisAndTaskId.rejected,
        getTaskByCategoryIdAction.rejected,
        gradingTaskACtion.rejected,
      ),
      (state, action) => {
        state.loadingTask = {...initialState.loadingTask};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getTaskAction.pending,
        getTaskByIdAction.pending,
        getTaskByNisAndTaskId.pending,
        getTaskByCategoryIdAction.pending,
        gradingTaskACtion.pending,
      ),
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
