import {BorrowState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
// import _ from 'lodash';

import {
  addPeminjam,
  deletePeminjam,
  getPeminjam,
  searchByStatusAfterReturn,
  // updatePeminjam,
  getPeminjamWithStatusRent,
  updateStatusPeminjamAction,
} from './borrow.thunk';
// import { getPeminjamDetailActionWithStatus } from "../borrow_detail";

const initialState: BorrowState = {
  borrows: [],
  loadingBorrow: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByNis: null,
};

export const borrowSlice = createSlice({
  name: 'peminjamen',
  initialState,
  reducers: {
    handleSearchBookAction: (state, action) => {
      state.searchByNis = action.payload.searchByNis;
    },
    resetBookAction: state => {
      state.searchByNis = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPeminjam.fulfilled, (state, action) => {
      state.loadingBorrow.get = false;
      state.borrows = action.payload.data;
    });
    // builder.addCase(getPeminjamWithStatusRent.fulfilled, (state, action) => {
    //   state.loadingBorrow.get = false;
    //   state.borrows = action.payload.data;
    // });
    builder.addCase(addPeminjam.fulfilled, state => {
      state.loadingBorrow.add = false;
    });
    builder.addCase(updateStatusPeminjamAction.fulfilled, state => {
      state.loadingBorrow.edit = false;

      // state.borrows = state.borrows.filter(
      //   item => item.id !== action.payload.data.id,
      // );
    });
    builder.addCase(deletePeminjam.fulfilled, (state, action) => {
      state.loadingBorrow.delete = false;
      state.borrows = state.borrows.filter(
        item => item.id !== action.payload.data.id,
      );
    });
    builder.addMatcher(
      isAnyOf(
        updateStatusPeminjamAction.rejected,
        getPeminjam.rejected,
        deletePeminjam.rejected,
        addPeminjam.rejected,
        getPeminjamWithStatusRent.rejected,
      ),
      (state, action) => {
        state.loadingBorrow = {...initialState.loadingBorrow};
        state.error = action.payload as any;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updateStatusPeminjamAction.pending,
        getPeminjam.pending,
        deletePeminjam.pending,
        addPeminjam.pending,
        getPeminjamWithStatusRent.pending,
      ),
      (state, action) => {
        state.loadingBorrow = {
          get:
            getPeminjam.pending.type === action.type ||
            searchByStatusAfterReturn.pending.type === action.type,
          add: addPeminjam.pending.type === action.type,
          edit: updateStatusPeminjamAction.pending.type === action.type,
          delete: deletePeminjam.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {resetBookAction, handleSearchBookAction} = borrowSlice.actions;
