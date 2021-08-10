import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useAuthContext } from "../../Auth";
import "./auth.css";

const baseURL = "http://127.0.0.1:8000/api/";

let initialState = {
	username: "",
	email: "",
	password1: "",
	password2: "",
	loading: false,
	error: null,
};

const Signup = () => {
	const { state, dispatch } = useAuthContext();
	const [data, setData] = useState(initialState);

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const signupHandler = (e) => {
		e.preventDefault();

		setData({
			...data,
			loading: true,
			error: null,
		});

		axios
			.post(baseURL + "register/", {
				username: data.username,
				emial: data.email,
				password1: data.password1,
				password2: data.password2,
			})
			.then((res) => {
				dispatch({
					type: "LOGIN",
					payload: res.data,
				});
			})
			.catch((err) => {
				const errorData = err["response"] ? err.response.data : "Network Error";
				setData({
					...data,
					loading: false,
					error: errorData,
				});
			});
	};

	const errorMessages = () => {
		console.log(data.error);

		return [
			data.error["username"] && (
				<p className="error" key={1}>
					{"Username : " + data.error["username"]}
				</p>
			),
			data.error["email"] && (
				<p className="error" key={2}>
					{"Email : " + data.error["email"]}
				</p>
			),
			data.error["password1"] && (
				<p className="error" key={3}>
					{"Password : " + data.error["password1"]}
				</p>
			),
			data.error["password2"] && (
				<p className="error" key={4}>
					{"Password(Again) : " + data.error["password2"]}
				</p>
			),
		];
	};

	return (
		<div className="text-center auth">
			{state.isAuth ? (
				<>
					<Redirect to="/" />
				</>
			) : (
				<main className="form-signin">
					<form>
						<h1 className="h3 mb-3 fw-normal">Sign Up</h1>
						{data.error && errorMessages()}
						<div className="form-floating">
							<input
								type="text"
								className="form-control"
								id="username"
								placeholder="username"
								name="username"
								value={data.username}
								onChange={handleInputChange}
							/>
							<label htmlFor="username">Username</label>
						</div>
						<div className="form-floating">
							<input
								type="text"
								className="form-control"
								id="email"
								placeholder="Email-ID"
								name="email"
								value={data.email}
								onChange={handleInputChange}
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="form-floating">
							<input
								type="password"
								className="form-control"
								id="password1"
								placeholder="password1"
								name="password1"
								value={data.password1}
								onChange={handleInputChange}
							/>
							<label htmlFor="username1">Password</label>
						</div>
						<div className="form-floating">
							<input
								type="password"
								className="form-control"
								id="password2"
								placeholder="Password2"
								name="password2"
								value={data.password2}
								onChange={handleInputChange}
							/>
							<label htmlFor="password2">Password (Again)</label>
						</div>
						<button
							className="btn btn-lg btn-primary"
							type="submit"
							disabled={data.loading}
							onClick={signupHandler}>
							{data.loading ? "Signing in..." : "Sign Up"}
						</button>
						<hr />
						<Link to="/login">
							<button className="btn btn-md btn-primary" type="button">
								Log In
							</button>
						</Link>{" "}
						&nbsp;
						<Link to="/">
							<button className="btn btn-md btn-primary" type="button">
								Home
							</button>
						</Link>
					</form>
				</main>
			)}
		</div>
	);
};

export default Signup;
