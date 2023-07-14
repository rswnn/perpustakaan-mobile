import {MemberState} from '@interfaces';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
// import _ from 'lodash';

import {
  addMember,
  deleteMember,
  getMember,
  searchByNis,
  updateMember,
} from './member.thunk';
import {ResponseStatus} from 'src/interfaces/network';

const initialState: MemberState = {
  member: [],
  loadingMember: {
    get: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {},
  searchByNis: null,
};

export const memberSlice = createSlice({
  name: 'anggotas',
  initialState,
  reducers: {
    handleSearchMemberAction: (state, action) => {
      state.searchByNis = action.payload.searchByNis;
    },
    resetMemberAction: state => {
      state.searchByNis = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.loadingMember.get = false;
      state.member = action.payload.data;
    });
    // builder.addCase(searchByNis.fulfilled, (state, action) => {
    //   state.loadingMember.get = false;
    //   const query = action.payload.queryParam?.query as string;
    //   if (!_.isEmpty(query)) {
    //     state.member = action.payload.data;
    //   } else {
    //     state.member = state.member as MemberDetail[];
    //   }
    // });
    // builder.addCase(addMember.fulfilled, state => {
    //   state.loadingMember.add = false;
    // });
    // builder.addCase(updateMember.fulfilled, state => {
    //   state.loadingMember.edit = false;
    // });
    // builder.addCase(deleteMember.fulfilled, state => {
    //   state.loadingMember.delete = false;
    // });
    builder.addMatcher(
      isAnyOf(
        updateMember.rejected,
        getMember.rejected,
        deleteMember.rejected,
        addMember.rejected,
      ),
      (state, action) => {
        state.loadingMember = {...initialState.loadingMember};
        state.error = action.payload as ResponseStatus;
      },
    );

    builder.addMatcher(
      isAnyOf(
        updateMember.pending,
        getMember.pending,
        deleteMember.pending,
        addMember.pending,
      ),
      (state, action) => {
        state.loadingMember = {
          get:
            getMember.pending.type === action.type ||
            searchByNis.pending.type === action.type,
          add: addMember.pending.type === action.type,
          edit: updateMember.pending.type === action.type,
          delete: deleteMember.pending.type === action.type,
        };
        state.error = initialState.error;
      },
    );
  },
});

export const {resetMemberAction, handleSearchMemberAction} =
  memberSlice.actions;
