import React, { Component } from "react";
import { Card, Form, FormGroup, Input, Button } from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { useState } from "react";

function DepartmentDashboard() {
	const img = require("../../../assets/images/img-01.png");

	return (
		<>
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
										<img src={img} alt="admin-img" />
									</div>
									<div className="col-12 col-md-7 text-center">
										<h1 className="admin-login" style={{ color: "black" }}>
											Department Login
										</h1>
										<br />
										<div className="row row-content">
											<div className="col-12">
												<Form>
													<FormGroup>
														<Input
															required={true}
															className="inputs"
															type="number"
															placeholder="Enter Department Username"
															name="username"
														/>
														<br />
														<Input
															required={true}
															className="inputs"
															type="number"
															placeholder="Enter Department Password"
															name="password"
														/>
														<br />
														<Button type="submit" color="success success-btn" block>
															LOGIN
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
		</>
	);
}

export default DepartmentDashboard;
