import API from './api';

export const getAllStudents = async () => {
  try {
    const res = await API.get('/student/get-all-students');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getStudentByRegNo = async (regNo) => {
  try {
    const res = await API.get(`/student/get-specific-student/${regNo}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getStudentWhoHaveNotPaidFess = async () => {
  try {
    const res = await API.get(`/student/get-unpaid-students`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateStudentFeeStatus = async (
  regNo,
  paymentId,
  day,
  companions
) => {
  try {
    const res = await API.put(
      `/student/update-student-payment-status/${regNo}`,
      { paymentId, day, companions }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createStudent = async (formData) => {
  try {
    const res = await API.post(`/student/create-student`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createStudents = async (formData) => {
  try {
    const res = await API.post(`/student/create-students`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateStudent = async (regNo) => {
  try {
    const res = await API.put(`/student/update-student/${regNo}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteStudent = async (regNo) => {
  try {
    const res = await API.delete(`/student/delete-student-by-reg-no/${regNo}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
