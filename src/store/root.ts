import {AnyAction, combineReducers, Reducer} from 'redux';
import {authSlice} from './auth';
import {bookSlice} from './book';
import {memberSlice} from './member';
import {borrowSlice} from './borrow';
import {borrowDetailSlice} from './borrow_detail';
const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [bookSlice.name]: bookSlice.reducer,
  [memberSlice.name]: memberSlice.reducer,
  [borrowSlice.name]: borrowSlice.reducer,
  [borrowDetailSlice.name]: borrowDetailSlice.reducer,
});

const rootReducer: Reducer = (state, action: AnyAction) => {
  return reducers(state, action);
};

export default rootReducer;
