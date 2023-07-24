import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

const Loader = (props) => {
	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Spinner style={{ width: "3rem", height: "3rem" }} />
		</div>
	);
};

Loader.propTypes = {};

export default Loader;
