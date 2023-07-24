import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { DASHBOARD, LOGIN } from "../constants/routes";

const PrivateRoute = ({ children, ...rest }) => {
	const {
		auth: { isAuthenticated, loading },
	} = useSelector((state) => {
		return {
			auth: state.auth,
		};
	}, shallowEqual);

	return (
		<Route
			{...rest}
			render={(props) => (!isAuthenticated && !loading ? <Redirect to={LOGIN} /> : children)}
		/>
	);
};

export default PrivateRoute;
