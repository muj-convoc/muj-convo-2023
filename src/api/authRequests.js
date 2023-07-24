import API from "./api";

export const register = async (formData) => {
	try {
		const res = await API.post("/auth/register", formData);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const login = async (formData) => {
	try {
		const res = await API.post("/auth/login", formData);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getMe = async (options = {}) => {
	try {
		const res = await API.get("/auth/getUser");
		return res.data;
	} catch (err) {
		throw err;
	}
};




export const logout = async () => {
	try {
		const res = await API.get("/auth/logout");
		return res.data;
	} catch (err) {
		throw err;
	}
};



export const addCommunicationData = async (formData) => {
	try {
		const res = await API.post(`/auth/add-communication-data`, formData);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const sendConfirmationEmail = async () => {
	try {
		const res = await API.get(`/auth/send-email`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
