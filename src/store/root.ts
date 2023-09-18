import {AnyAction, combineReducers, Reducer} from 'redux';
import {authSlice} from './auth';
import {categorySlice} from './category';
import {teacherSlice} from './teacher';
import {studentSlice} from './student';
import {taskSlice} from './task';
import {classroomSlice} from './classroom';
const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [teacherSlice.name]: teacherSlice.reducer,
  [studentSlice.name]: studentSlice.reducer,
  [taskSlice.name]: taskSlice.reducer,
  [classroomSlice.name]: classroomSlice.reducer,
});

const rootReducer: Reducer = (state, action: AnyAction) => {
  return reducers(state, action);
};

export default rootReducer;
