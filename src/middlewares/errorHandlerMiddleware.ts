import {Middleware} from '@reduxjs/toolkit';

const errorHandlerMiddleware: Middleware = () => next => action => {
  // if ( !navigator.onLine && action.type.includes( 'rejected' ) ) {
  //   errorAlert( 'Periksa Koneksi' );

  // }
  // if ( hasOwnProperty( action, 'payload' ) ) {
  //   if ( action.payload && hasOwnProperty( action.payload, 'type' ) ) {
  //     if ( E_ErrorType.TokenExpiredError === action.payload.type ) {
  //       errorAlert( 'User session telah berakhkir' );
  //     }
  //   }
  // }

  return next(action);
};

export default errorHandlerMiddleware;
