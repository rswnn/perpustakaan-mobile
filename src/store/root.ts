import {AnyAction, combineReducers, Reducer} from 'redux';
import {authSlice} from './auth';
const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const rootReducer: Reducer = (state, action: AnyAction) => {
  return reducers(state, action);
};

export default rootReducer;
