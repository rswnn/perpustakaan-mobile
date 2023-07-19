import {BorrowState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
// import _ from 'lodash';

import {
  addPeminjam,
  deletePeminjam,
  getPeminjam,
  searchByStatusAfterReturn,
  updatePeminjam,
} from './borrow.thunk';

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
    // builder.addCase(searchByNis.fulfilled, (state, action) => {
    //   state.loadingBorrow.get = false;
    //   const query = action.payload.queryParam?.query as string;
    //   if (!_.isEmpty(query)) {
    //     state.borrows = action.payload.data;
    //   } else {
    //     state.borrows = state.borrows as BorrowDetail[];
    //   }
    // });
    builder.addCase(addPeminjam.fulfilled, state => {
      state.loadingBorrow.add = false;
    });
    // builder.addCase(updatePeminjam.fulfilled, state => {
    //   state.loadingBorrow.edit = false;
    // });
    // builder.addCase(deletePeminjam.fulfilled, state => {
    //   state.loadingBorrow.delete = false;
    // });
    builder.addMatcher(
      isAnyOf(
        updatePeminjam.rejected,
        getPeminjam.rejected,
        deletePeminjam.rejected,
        addPeminjam.rejected,
      ),
      (state, action) => {
        state.loadingBorrow = {...initialState.loadingBorrow};
        state.error = action.payload as any;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updatePeminjam.pending,
        getPeminjam.pending,
        deletePeminjam.pending,
        addPeminjam.pending,
      ),
      (state, action) => {
        state.loadingBorrow = {
          get:
            getPeminjam.pending.type === action.type ||
            searchByStatusAfterReturn.pending.type === action.type,
          add: addPeminjam.pending.type === action.type,
          edit: updatePeminjam.pending.type === action.type,
          delete: deletePeminjam.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {resetBookAction, handleSearchBookAction} = borrowSlice.actions;
