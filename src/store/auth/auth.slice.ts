import {AuthResponseType, UserType} from '@interfaces';
import {createSlice} from '@reduxjs/toolkit';

const initialState: AuthResponseType = {
  jwt: '',
  user: {} as UserType,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginAction: state => {
      state.isLoggedIn = true;
    },
    setLogoutAction: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {setLoginAction, setLogoutAction} = authSlice.actions;

// import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import {
//   getVendorsAction, addVendorAction, updateVendorAction, deleteVendorAction, searchVendorsAction
// } from './roleConfigThunk';
// import { ResponseStatus } from 'interface';
// import _ from 'lodash';

// const initialState = {
//   vendors: [],
//   tempVendor: [],
//   loading: false,
//   error: {}
// };

// export const vendorSlice = createSlice( {
//   name: 'vendors',
//   initialState,
//   reducers: {
//     resetVendorAction: state => {
//       state.vendors = state.tempVendor;
//     }
//   },
//   extraReducers: builder => {
//     builder.addCase( getVendorsAction.fulfilled, ( state, action ) => {
//       state.loading = false;
//       state.vendors = action.payload.data as any;
//       state.tempVendor = action.payload.data as any;
//     } );
//     builder.addCase( searchVendorsAction.fulfilled, ( state, action ) => {
//       state.loading = false;
//       const query = action.payload.queryParam?.query as string;
//       if ( !_.isEmpty( query ) ) {
//         state.vendors = action.payload.data as any;
//       } else {
//         state.vendors = state.tempVendor as any;
//       }
//     } );
//     builder.addCase( addVendorAction.fulfilled, state => {
//       state.loading = false;
//     } );
//     builder.addCase( updateVendorAction.fulfilled, state => {
//       state.loading = false;
//     } );
//     builder.addCase( deleteVendorAction.fulfilled, state => {
//       state.loading = false;
//     } );
//     builder.addMatcher(
//       isAnyOf( updateVendorAction.rejected, getVendorsAction.rejected,
//         addVendorAction.rejected, deleteVendorAction.rejected, searchVendorsAction.rejected ), ( state, action ) => {
//         state.loading = false;
//         state.error = action.payload as ResponseStatus;
//       } );
//     builder.addMatcher(
//       isAnyOf( updateVendorAction.pending, getVendorsAction.pending,
//         addVendorAction.pending, deleteVendorAction.pending, searchVendorsAction.pending ), state => {
//         state.loading = true;
//         state.error = initialState.error;
//       } );
//   }
// } );

// export const { resetVendorAction } = vendorSlice.actions;
