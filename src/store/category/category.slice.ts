import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {CategoryState} from '@interfaces';
import {getCategoryAction, getCategoryByIdAction} from './category.thunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {isEmpty} from 'lodash';
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
  loading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    handleSearchBookCategoryAction: (state, action) => {
      state.searchById = action.payload.data.searchById;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(getCategoryAction.rejected, getCategoryByIdAction.rejected),
      (state, action) => {
        state.loadingCategory = {...initialState.loadingCategory};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(isAnyOf(getCategoryAction.pending), (state, action) => {
      state.loadingCategory = {
        get:
          getCategoryAction.pending.type === action.type ||
          getCategoryByIdAction.pending.type === action.type,
        add: false,
        edit: false,
        delete: false,
      };
      state.error = initialState.error;
    });
    builder.addMatcher(
      isAnyOf(getCategoryAction.fulfilled, getCategoryByIdAction.fulfilled),
      (state, action) => {
        state.loadingCategory.get = false;
        state.categories = action.payload.data;
      },
    );
  },
});

export const {handleSearchBookCategoryAction} = categorySlice.actions;
