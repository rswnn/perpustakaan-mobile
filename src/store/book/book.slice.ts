import {BookState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
// import _ from 'lodash';
// import {baseUrl} from 'src/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import isEmpty from 'lodash/isEmpty';

import {
  addBooks,
  deleteBooks,
  getBooks,
  searchByKode,
  updateBooks,
} from './book.thunk';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: BookState = {
  books: [],
  loadingBook: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByKode: null,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    handleSearchBookAction: (state, action) => {
      state.searchByKode = action.payload.searchByKode;
    },
    resetBookAction: state => {
      state.searchByKode = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loadingBook.get = false;
      state.books = action.payload.data;
    });
    // builder.addCase(searchByKode.fulfilled, (state, action) => {
    //   state.loadingBook.get = false;
    //   const query = action.payload.queryParam?.query as string;
    //   if (!_.isEmpty(query)) {
    //     state.books = action.payload.data;
    //   } else {
    //     state.books = state.books as BookDetail[];
    //   }
    // });
    builder.addCase(addBooks.fulfilled, state => {
      state.loadingBook.add = false;
    });
    // builder.addCase(updateBooks.fulfilled, state => {
    //   state.loadingBook.edit = false;
    // });
    builder.addCase(deleteBooks.fulfilled, state => {
      state.loadingBook.delete = false;
    });
    builder.addMatcher(
      isAnyOf(
        updateBooks.rejected,
        getBooks.rejected,
        deleteBooks.rejected,
        addBooks.rejected,
      ),
      (state, action) => {
        state.loadingBook = {...initialState.loadingBook};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updateBooks.pending,
        getBooks.pending,
        deleteBooks.pending,
        addBooks.pending,
      ),
      (state, action) => {
        state.loadingBook = {
          get:
            getBooks.pending.type === action.type ||
            searchByKode.pending.type === action.type,
          add: addBooks.pending.type === action.type,
          edit: updateBooks.pending.type === action.type,
          delete: deleteBooks.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

// const selectBook = (state: BookState) => state;
// export const bookDraftSelector = createDraftSafeSelector(selectBook, state => {
//   return {
//     ...state,
//     books: state?.books?.filter(book => {
//       if (state.searchByKode) {
//         return book?.kode_buku === state.searchByKode;
//       } else if (state.searchByKode) {
//         return book?.kode_buku === state.searchByKode;
//       }
//       return book;
//     }),
//   };
// });

export const {resetBookAction, handleSearchBookAction} = bookSlice.actions;
