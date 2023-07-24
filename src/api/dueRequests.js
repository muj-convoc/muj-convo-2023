import API from "./api";

export const getDueByRegNo = async (reg_no) => {
	try {
		const res = await API.get(`/due/get-student-dept-dues/${reg_no}`);
		return res.data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const createStudentDue = async (formData) => {
	try {
		const res = await API.post(`/due/create-student-dept-due`, formData);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const clearAllDuesForDepartment = async (formData) => {
	try {
		const res = await API.delete(`/due/delete-student-by-dept-reg-no`, formData);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const clearDue = async (id) => {
	try {
		const res = await API.put(`/due/clear-student-due/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
