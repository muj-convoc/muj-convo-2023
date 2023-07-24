import { createSlice } from '@reduxjs/toolkit';
import { setAlert } from './alertSlice';
import * as REQUESTS from '../api/feedbackRequests';
import { DASHBOARD, STUDENT_DASHBOARD } from '../constants/routes';
import { loadUser } from './authSlice';

const initialState = {
  feedbackArray: null,
  allFeedbacks: null,
  loading: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedbackArray(state, action) {
      state.feedbackArray = action.payload;
      state.loading = false;
    },

    setAllFeedbacks(state, action) {
      state.allFeedbacks = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

const { setFeedbackArray, setAllFeedbacks, setLoading } = feedbackSlice.actions;

export default feedbackSlice.reducer;

// Thunks

export const getQuestions = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { success, data } = await REQUESTS.getQuestions();

    if (success) {
      dispatch(setFeedbackArray(data));
    }
  } catch (err) {
    dispatch(setLoading());
    console.log(err);
    dispatch(setAlert(err.response.data.error));
  }
};

export const submitFeedback = (formData, history) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { success, data } = await REQUESTS.submitFeedback(formData);

    if (success) {
      dispatch(loadUser());
      history.push(STUDENT_DASHBOARD);
    }
  } catch (err) {
    dispatch(setLoading());
    console.log(err);
    dispatch(setAlert(err.response.data.error));
  }
};

export const getFeedbacks = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { success, data } = await REQUESTS.getFeedbacks();

    if (success) {
      dispatch(setAllFeedbacks(data));
    }
  } catch (err) {
    dispatch(setLoading());
    console.log(err);
    dispatch(setAlert(err.response.data.error));
  }
};
