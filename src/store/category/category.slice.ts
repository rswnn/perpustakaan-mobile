import {CategoryDetail, CategoryState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import _ from 'lodash';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import isEmpty from 'lodash/isEmpty';

import {
  addCategory,
  deleteCategory,
  getCategory,
  searchById,
  updateCategory,
} from './category.thunk';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: CategoryState = {
  categories: [],
  loadingCategory: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchById: null,
};

export const bookSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    handleSearchCategoryAction: (state, action) => {
      state.searchById = action.payload.searchById;
    },
    resetCategoryAction: state => {
      state.searchById = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loadingCategory.get = false;
      state.categories = action.payload.data;
    });
    builder.addCase(searchById.fulfilled, (state, action) => {
      state.loadingCategory.get = false;
      const query = action.payload.queryParam?.query as string;
      if (!_.isEmpty(query)) {
        state.categories = action.payload.data;
      } else {
        state.categories = state.categories as CategoryDetail[];
      }
    });
    builder.addCase(addCategory.fulfilled, state => {
      state.loadingCategory.add = false;
    });
    builder.addCase(updateCategory.fulfilled, state => {
      state.loadingCategory.edit = false;
    });
    builder.addCase(deleteCategory.fulfilled, state => {
      state.loadingCategory.delete = false;
    });
    builder.addMatcher(
      isAnyOf(
        updateCategory.rejected,
        getCategory.rejected,
        deleteCategory.rejected,
        addCategory.rejected,
      ),
      (state, action) => {
        state.loadingCategory = {...initialState.loadingCategory};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updateCategory.pending,
        getCategory.pending,
        deleteCategory.pending,
        addCategory.pending,
      ),
      (state, action) => {
        state.loadingCategory = {
          get:
            getCategory.pending.type === action.type ||
            searchById.pending.type === action.type,
          add: addCategory.pending.type === action.type,
          edit: updateCategory.pending.type === action.type,
          delete: deleteCategory.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {resetCategoryAction, handleSearchCategoryAction} =
  bookSlice.actions;
