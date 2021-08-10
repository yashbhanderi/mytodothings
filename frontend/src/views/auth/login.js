import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useAuthContext } from "../../Auth";
import "./auth.css";

const baseURL = "http://127.0.0.1:8000/api/";

const initialState = {
	username: "",
	password: "",
	loading: false,
	error: null,
};

const Login = () => {
	const { state, dispatch } = useAuthContext();
	const [data, setData] = useState(initialState);

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const loginHandler = (e) => {
		e.preventDefault();

		setData({
			...data,
			loading: true,
			error: null,
		});

		axios
			.post(baseURL + "login/", {
				username: data.username,
				password: data.password,
			})
			.then((res) => {
				dispatch({
					type: "LOGIN",
					payload: res.data,
				});
			})
			.catch((err) => {
				const errorData = err["response"] ? err.response.data : "Network Error";
				console.log(errorData);
				setData({
					...data,
					loading: false,
					error: errorData,
				});
			});
	};

	const errorMessages = () => {
		return [
			data.error["username"] && (
				<p className="error" key={1}>
					{"Username : " + data.error["username"]}
				</p>
			),
			data.error["password"] && (
				<p className="error" key={2}>
					{"Password : " + data.error["password"]}
				</p>
			),
			data.error["non_field_errors"] && (
				<p className="error" key={3}>
					{"invalid credentials !"}
				</p>
			),
		];
	};

	return (
		<div className="text-center auth">
			{state.isAuth ? (
				<Redirect to="/" />
			) : (
				<main className="form-signin">
					<form>
						<h1 className="h3 mb-3 fw-normal">Log in</h1>
						{data.error && errorMessages()}
						<div className="form-floating">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								placeholder="username"
								name="username"
								value={data.username}
								onChange={handleInputChange}
							/>
							<label htmlFor="floatingInput">Username</label>
						</div>
						<div className="form-floating">
							<input
								type="password"
								className="form-control"
								id="floatingPassword"
								placeholder="Password"
								name="password"
								value={data.password}
								onChange={handleInputChange}
							/>
							<label htmlFor="floatingPassword">Password</label>
						</div>
						<button
							className="btn btn-lg btn-primary"
							type="submit"
							disabled={data.loading}
							onClick={loginHandler}>
							{data.loading ? "Logging in..." : "Log In"}
						</button>
						<hr />
						<Link to="/signup">
							<button className="btn btn-md btn-primary" type="button">
								Sign Up
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

export default Login;
