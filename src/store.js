import thunk from "redux-thunk";
import rootReducer from "./slices/index";
import { configureStore } from "@reduxjs/toolkit";

// import setAuthToken from "./utils/setAuthToken";

const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

export default store;
