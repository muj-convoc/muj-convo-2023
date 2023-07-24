import { createSlice } from "@reduxjs/toolkit";
import * as REQUESTS from "../api/studentRequest";
import * as DUE_REQUESTS from "../api/dueRequests";
import { setAlert } from "./alertSlice";

const initialState = {
	allStudents: null,
	student: null,
	unpaidStudents: null,
	addedStudent: null,
	studentWhosePaymentStatusChanged: null,
	updatedStudent: null,
	deletedStudent: null,
	allDues: null,
	addedDue: null,
	deletedDue: null,
	loading: false,
};

const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		setAllStudents(state, action) {
			state.allStudents = action.payload;
			state.loading = false;
		},
		setStudent(state, action) {
			state.student = action.payload;
			state.loading = false;
		},
		setUnpaidStudents(state, action) {
			state.unpaidStudents = action.payload;
			state.loading = false;
		},
		setStudentWhosePaymentStatusChanged(state, action) {
			state.studentWhosePaymentStatusChanged = action.payload;
			state.loading = false;
		},
		setAddedStudent(state, action) {
			state.addedStudent = action.payload;
			state.loading = false;
		},
		setUpdatedStudent(state, action) {
			state.updatedStudent = action.payload;
			state.loading = false;
		},
		setDeletedStudent(state, action) {
			state.deletedStudent = action.payload;
			state.loading = false;
		},
		setAllDues(state, action) {
			state.allDues = action.payload;
			state.loading = false;
		},
		setAddedDue(state, action) {
			state.addedDue = action.payload;
			state.loading = false;
		},
		setDeletedDue(state, action) {
			state.deletedDue = action.payload;
			state.loading = false;
		},
		setLoading(state) {
			state.loading = !state.loading;
		},
	},
});

export const {
	setAddedStudent,
	setAllStudents,
	setDeletedStudent,
	setLoading,
	setStudent,
	setStudentWhosePaymentStatusChanged,
	setUnpaidStudents,
	setUpdatedStudent,
	setAddedDue,
	setAllDues,
	setDeletedDue,
} = studentSlice.actions;

export default studentSlice.reducer;

// Thunks

export const getAllStudents = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await REQUESTS.getAllStudents();
		const { data } = resData;
		dispatch(setAllStudents(data));
	} catch (err) {
		dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};

export const getStudentByRegNo = (reg_no) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await REQUESTS.getStudentByRegNo(reg_no);
		const { student } = resData;
		dispatch(setStudent(student));
	} catch (err) {
		dispatch(setAlert("No Student Found!", "danger"));
		dispatch(setStudent(null));
		// dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};

export const getAllDues = (reg_no) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await DUE_REQUESTS.getDueByRegNo(reg_no);
		const { data } = resData;
		dispatch(setAllDues(data));
	} catch (err) {
		// dispatch(setAlert("No Dues Exist!", "danger"));
		// dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};

export const addDue = (formData) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await DUE_REQUESTS.createStudentDue(formData);
		const { data } = resData;
		dispatch(setAddedDue(data));
		dispatch(setAlert("Due added", "success"));
	} catch (err) {
		dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};

export const deleteDue = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await DUE_REQUESTS.clearDue(id);
		const { student } = resData;
		dispatch(setAddedDue(student));
		dispatch(setAlert("Due cleared", "success"));
	} catch (err) {
		dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};

export const clearAllDues = (reg_no) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const resData = await DUE_REQUESTS.clearAllDuesForDepartment({ reg_no });
		const { student } = resData;
		// dispatch(setAddedDue(student));
	} catch (err) {
		dispatch(setAlert(err.reposnse.data.error, "danger"));
	}
};
