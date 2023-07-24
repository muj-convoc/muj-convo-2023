import setAuthToken from "../utils/setAuthToken";
import { createSlice } from "@reduxjs/toolkit";
import { setAlert } from "./alertSlice";
import * as REQUESTS from "../api/authRequests";
import { LOGIN } from "../constants/routes";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authStart(state) {
			state.loading = true;
			state.error = null;
		},
		setCurrentUser(state, action) {
			state.isAuthenticated = true;
			state.user = action.payload.data;
			state.loading = false;
		},
		setToken(state, action) {
			state.isAuthenticated = true;
			state.token = action.payload;
			state.loading = false;
		},
		authFailure(state, action) {
			state.token = null;
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = action.payload ? action.payload : "Could not connect";
		},
		setLogout(state) {
			state.token = null;
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
		},
		authComplete(state) {
			state.loading = false;
			state.error = null;
		},
		setLoading(state) {
			state.loading = !state.loading;
		},
	},
});

export const {
	authStart,
	setCurrentUser,
	authFailure,
	authComplete,
	setLoading,
	setToken,
	setLogout,
} = authSlice.actions;

export default authSlice.reducer;

// thunks

//load user
export const loadUser = (data) => async (dispatch) => {
	try {
		const data = await REQUESTS.getMe();
		const { success } = data;
		if (success) {
			dispatch(setCurrentUser(data));
		}
	} catch (err) {
		dispatch(authFailure(err.response.data.error));
	}
};

//register user
export const register = (formData) => async (dispatch) => {
	try {
		dispatch(authStart());
		const data = await REQUESTS.register(formData);
		const { success } = data;
		if (success) {
			dispatch(
				setAlert(
					"An email has been sent to your email for password details please use that password to login, please check you spam.",
					"success"
				)
			);
			dispatch(setLoading());
		}
	} catch (err) {
		dispatch(setAlert(err.response.data.error, "danger"));
		dispatch(authFailure("Error"));
	}
};

//login
export const login = (formData) => async (dispatch) => {
	try {
		dispatch(authStart());
		console.log(formData);
		const data = await REQUESTS.login(formData);
		const { success, token } = data;
		if (success) {
			// Setting token to authorisation header in axios
			await setAuthToken(token);

			dispatch(loadUser());
			dispatch(setToken(token));

			dispatch(setAlert("Logged in Successfully", "success"));
			dispatch(authComplete());
		}
	} catch (err) {
		console.log(err);
		dispatch(setAlert(err.response.data.error, "danger"));
		dispatch(authFailure(err.response.data.error));
	}
};

// update user details
export const addCommunicationDetails = (formData) => async (dispatch) => {
	try {
		dispatch(setLoading());

		const data = await REQUESTS.addCommunicationData(formData);
		const { success } = data;

		if (success) {
			dispatch(loadUser());
			dispatch(setAlert("Added Commuication details successfully!", "success"));
		}
	} catch (err) {
		dispatch(setAlert(err.response.data.error, "danger"));
		// dispatch(authFailure(err.response.data.error));
	}
};


//logout
export const logout = () => async (dispatch) => {
	dispatch(setLogout());
	dispatch(setAlert("Logged out successfully", "success"));
	await REQUESTS.logout();
};

