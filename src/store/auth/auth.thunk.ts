export {};
// import { VendorDetail, VendorPayload } from 'interface';
// import { endpoints } from 'constant';
// import { thunkUtils } from 'utils';
// import { errorAlert } from 'components';

// export const getVendorsAction = thunkUtils<VendorDetail[], VendorPayload>( {
//   type: 'vendors/getVendors',
//   method: 'GET',
//   endpoint: endpoints.vendor,
// } );
// export const searchVendorsAction = thunkUtils<VendorDetail[], VendorPayload>( {
//   type: 'vendors/searchVendors',
//   method: 'GET',
//   endpoint: endpoints.vendor + '/search',
//   onSuccess: ( { response } ) => {
//     if ( !response.data.length ) {
//       errorAlert( 'Partai tidak ditemukan' );
//     }
//   }
// } );
// export const addVendorAction = thunkUtils<VendorPayload>( {
//   type: 'vendors/addVendor',
//   endpoint: endpoints.vendor,
//   method: 'POST',
//   onSuccess: ( { response, dispatch } ) => dispatch( getVendorsAction() ),
// } );

// export const updateVendorAction = thunkUtils<VendorDetail, VendorPayload>( {
//   type: 'vendors/updateVendor',
//   endpoint: endpoints.vendor,
//   method: 'PUT',
//   onSuccess: ( { response, dispatch } ) => dispatch( getVendorsAction() ),
// } );

// export const deleteVendorAction = thunkUtils<VendorDetail, VendorPayload>( {
//   type: 'vendors/deleteVendor',
//   endpoint: endpoints.vendor,
//   method: 'DELETE',
//   onSuccess: ( { response, dispatch } ) => dispatch( getVendorsAction() ),
// } );
