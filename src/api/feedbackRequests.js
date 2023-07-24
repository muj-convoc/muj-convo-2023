import API from './api';

export const getQuestions = async () => {
  try {
    const res = await API.get('/feedback/get-all-ques');

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const submitFeedback = async (formData) => {
  try {
    const res = await API.post('/feedback/submit-feedback', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getFeedbacks = async () => {
  try {
    const res = await API.get('/feedback/get-all-feedbacks');
    return res.data;
  } catch (err) {
    throw err;
  }
};
