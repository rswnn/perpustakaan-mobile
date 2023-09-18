import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {TeacherState} from '@interfaces';
import {getTeacherAction} from './teacher.thunk';
// import {isEmpty} from 'lodash';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: TeacherState = {
  teacher: [],
  loadingTeacher: {
    get: false,
    edit: false,
    add: false,
    delete: false,
  },
  error: {},
  searchByNip: '',
};

export const teacherSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setTeacherById: (state, action) => {
      state.searchByNip = action.payload.data.searchByNip;
    },
  },
  extraReducers: builder => {
    // console.log(builder, 'BUILDER');
    builder.addCase(getTeacherAction.fulfilled, (state, action) => {
      state.loadingTeacher.get = false;
      state.teacher = action.payload.data;
    });
    builder.addMatcher(isAnyOf(getTeacherAction.rejected), (state, action) => {
      state.loadingTeacher = {...initialState.loadingTeacher};
      state.error = action.payload as ResponseStatus;
    });

    builder.addMatcher(isAnyOf(getTeacherAction.pending), (state, action) => {
      state.loadingTeacher = {
        get: getTeacherAction.pending.type === action.type,
        add: false,
        edit: false,
        delete: false,
      };
      state.error = initialState.error;
    });
  },
});
export const {setTeacherById} = teacherSlice.actions;
