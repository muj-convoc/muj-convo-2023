import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./HeaderComponent";
import HomePage from "./HomeComponent";
import AdminPage from "./AdminComponent";
import DeptPage from "./DepartmentComponent";
import StudentPage from "./StudentComponent";
import Footer from "./FooterComponent";
import Contact from "./Contact"

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route path="/contact" component={Contact} />
					<Route path="/admin" component={AdminPage} />
					<Route path="/department" component={DeptPage} />
					<Route path="/student" component={StudentPage} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
