import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import studentReducer from './studentSlice';
import feedbackReducer from './feedbackSlice';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  student: studentReducer,
  feedback: feedbackReducer,
});
