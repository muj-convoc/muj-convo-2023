// import React, { Component } from "react";
import React from 'react';

import { Card, CardTitle, CardText, Button } from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { LOGIN, REGISTER } from "../constants/routes";
// import { useEffect } from "react";

const Home = () => {
	const [width, setWidth] = React.useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);
	return (
		<>
			<div className="container">
				<FadeTransform
					in
					transformProps={{
						exitTransform: "opacity(1)",
					}}
				>
					<br />
					<div className="row ">
						<div className="col-12 text-center">
							<h1 className="heading" style={{ fontSize: "2.2rem" }}>
								9
								<sup className="heading" style={{ textTransform: "lowercase" }}>
									th
								</sup>{" "}
								Annual Convocation Manipal University Jaipur
							</h1>
						</div>
					</div>
				</FadeTransform>
			</div>
			<div className="container">
				<FadeTransform
					in
					transformProps={{
						exitTransform: "scale(0.5)",
					}}
				>
					<div className="row row-content align-items-center">
						<div className="col-12 col-md-5">
							<Card body inverse className="card-home">
								<CardTitle>
									<h2 className="welcome-msg">Welcome to 9th Annual Convocation</h2>
								</CardTitle>
								<p
									style={{
										fontSize: "20px",
										paddingBottom: "5px",
										borderBottom: "1px solid white",
									}}
								>
									Manipal University Jaipur
								</p>
								<CardText style={{ padding: "10px" }}>
									“You are educated. Your certification is in your degree. You may think of it as
									the ticket to the good life. Let me ask you to think of an alternative. Think of
									it as your ticket to change the world.” —Tom Brokaw
								</CardText>
							</Card>
						</div>
						<div className="col-12 col-md-7 " style={{ position: "relative" }}>
							{/* <div className="contaniner"> */}

							{/* </div> */}

							<img
								style={{ filter: "blur(4px)" }}
								src={require("../assets/images/banner.jpeg")}
								alt="banner-img"
								className="banner-img"
							/>
							<div
								style={{
									position: "absolute",

									top: "30%",
									left: "50%",
									transform: "translate(-50%, -50%)",
								}}
							>
								<h1
									className="heading"
									style={{
										// background: "linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)",
										WebkitTextFillColor: "transparent",
										WebkitBackgroundClip: "text",
										fontSize: "2.5rem",
										textAlign: "center",
									}}
								>
									Get Started
								</h1>
							</div>
							<div
								style={{
									position: "absolute",

									top: "60%",
									left: width > 600 ? "30%" : "20%",
									margin: "0 auto",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									// left: "50%",
									// transform: "translate(-50%, -50%)",
								}}
							>
								<Link to={LOGIN} style={{ textDecoration: "none", margin: "1rem" }}>
									<Button color="success" size="lg">
										Login
									</Button>
								</Link>

								<Link to={REGISTER} style={{ textDecoration: "none", margin: "1rem" }}>
									<Button color="success" size="lg">
										Register
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</FadeTransform>
			</div>
		</>
	);
};

export default Home;
