import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {ClassroomState} from '@interfaces';
import {
  getClassroomAction,
  getClassroomByKodeKelasAction,
  getClassroomByNipAction,
} from './classroom.thunk';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: ClassroomState = {
  classroom: [],
  loadingClass: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByKodeKelas: null,
  loading: false,
};

export const classroomSlice = createSlice({
  name: 'classRoom',
  initialState,
  reducers: {
    handleSearchClassroomByCodeAction: (state, action) => {
      state.searchByKodeKelas = action.payload.data.searchByKodeKelas;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        getClassroomAction.rejected,
        getClassroomByKodeKelasAction.rejected,
      ),
      (state, action) => {
        state.loadingClass = {...initialState.loadingClass};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getClassroomAction.pending,
        getClassroomByKodeKelasAction.pending,
        getClassroomByNipAction.pending,
      ),
      (state, action) => {
        state.loadingClass = {
          get:
            getClassroomAction.pending.type === action.type ||
            getClassroomByKodeKelasAction.pending.type === action.type ||
            getClassroomByNipAction.pending.type === action.type,
          add: false,
          edit: false,
          delete: false,
        };
        state.error = initialState.error;
      },
    );
    builder.addMatcher(
      isAnyOf(getClassroomAction.fulfilled),
      (state, action) => {
        state.loadingClass.get = false;
        state.classroom = action.payload.data;
      },
    );

    builder.addMatcher(
      isAnyOf(getClassroomByKodeKelasAction.fulfilled),
      (state, action) => {
        state.loadingClass.get = false;
        state.classroom = action.payload.data.students;
      },
    );

    builder.addMatcher(
      isAnyOf(getClassroomByKodeKelasAction.fulfilled),
      (state, action) => {
        // console.log(action.payload, 'ACTION CLASS');
        state.loadingClass.get = false;
        state.classroom = action.payload.data;
      },
    );
  },
});

export const {handleSearchClassroomByCodeAction} = classroomSlice.actions;
