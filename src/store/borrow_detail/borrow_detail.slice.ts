import {DetailBorrowState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
// import _ from 'lodash';

import {
  addPeminjam,
  deletePeminjam,
  getPeminjamDetailAction,
  searchByNis,
  updateStatusAction,
} from './borrow_detail.thunk';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: DetailBorrowState = {
  detailBorrows: [],
  loadingBorrow: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByNis: null,
};

export const borrowDetailSlice = createSlice({
  name: 'peminjaman-details',
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
    builder.addCase(getPeminjamDetailAction.fulfilled, (state, action) => {
      console.log(state.detailBorrows);
      state.loadingBorrow.get = false;
      state.detailBorrows = action.payload.data;
    });
    // builder.addCase(searchByNis.fulfilled, (state, action) => {
    //   state.loadingBorrow.get = false;
    //   const query = action.payload.queryParam?.query as string;
    //   if (!_.isEmpty(query)) {
    //     state.borrows = action.payload.data;
    //   } else {
    //     state.borrows = state.borrows as BorrowDetail[];
    //   }
    // });
    // builder.addCase(addPeminjam.fulfilled, state => {
    //   state.loadingBorrow.add = false;
    // });
    // builder.addCase(updatePeminjam.fulfilled, state => {
    //   state.loadingBorrow.edit = false;
    // });
    // builder.addCase(deletePeminjam.fulfilled, state => {
    //   state.loadingBorrow.delete = false;
    // });
    builder.addMatcher(
      isAnyOf(
        updateStatusAction.rejected,
        getPeminjamDetailAction.rejected,
        deletePeminjam.rejected,
        addPeminjam.rejected,
      ),
      (state, action) => {
        state.loadingBorrow = {...initialState.loadingBorrow};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updateStatusAction.pending,
        getPeminjamDetailAction.pending,
        deletePeminjam.pending,
        addPeminjam.pending,
      ),
      (state, action) => {
        state.loadingBorrow = {
          get:
            getPeminjamDetailAction.pending.type === action.type ||
            searchByNis.pending.type === action.type,
          add: addPeminjam.pending.type === action.type,
          edit: updateStatusAction.pending.type === action.type,
          delete: deletePeminjam.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {resetBookAction, handleSearchBookAction} =
  borrowDetailSlice.actions;
