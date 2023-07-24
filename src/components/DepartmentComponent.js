import React, { Component } from "react";
import { Card, Form, FormGroup, Input, Button } from "reactstrap";
import { FadeTransform } from "react-animation-components";

class Department extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<FadeTransform
					in
					transformProps={{
						exitTransform: "scale(0.5)",
					}}
				>
					<div className="row">
						<div className="col-12 justify-content-center form-outer">
							<Card body style={{ backgroundColor: "white" }} className="card-admin">
								<div className="row form-inner">
									<div className="col-md-5 text-center d-none d-md-block">
										<img src="assets/images/img-01.png" alt="admin-img" />
									</div>
									<div className="col-12 col-md-7 text-center">
										<h1 className="admin-login">Department Login</h1>
										<br />
										<div className="row row-content">
											<div className="col-12">
												<Form>
													<FormGroup>
														<Input
															className="inputs"
															type="email"
															placeholder="Email"
															name="email"
														/>
														<br />
														<Input
															className="inputs"
															type="password"
															placeholder="Password"
															name="password"
														/>
														<br />
														<Button color="success success-btn" block>
															Login
														</Button>
													</FormGroup>
												</Form>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
					<br />
					<br />
				</FadeTransform>
			</div>
		);
	}
}

export default Department;
