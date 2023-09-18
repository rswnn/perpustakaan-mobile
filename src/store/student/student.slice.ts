import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {StudentState} from '@interfaces';
import {getStudentAction, getStudentByClasscode} from './student.thunk';
// import {isEmpty} from 'lodash';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: StudentState = {
  student: [],
  loadingStudent: {
    get: false,
    add: false,
    delete: false,
    edit: false,
  },
  error: {},
  searchByNis: '',
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentById: (state, action) => {
      state.searchByNis = action.payload.data.searchByNis;
    },
  },
  extraReducers: builder => {
    // console.log(builder, 'BUILDER');
    builder.addCase(getStudentAction.fulfilled, (state, action) => {
      state.loadingStudent.get = false;
      state.student = action.payload.data;
    });
    builder.addCase(getStudentByClasscode.fulfilled, (state, action) => {
      state.loadingStudent.get = false;
      state.student = action.payload.data;
    });
    builder.addMatcher(
      isAnyOf(getStudentAction.rejected, getStudentByClasscode.rejected),
      (state, action) => {
        state.loadingStudent = {...initialState.loadingStudent};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(getStudentAction.pending, getStudentByClasscode.pending),
      (state, action) => {
        state.loadingStudent = {
          get: getStudentAction.pending.type === action.type,
          add: false,
          edit: false,
          delete: false,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {setStudentById} = studentSlice.actions;
