import { useGlobalContext } from "../../Context";
import { useAuthContext } from "../../Auth";
import { Redirect, withRouter, Link } from "react-router-dom";
import "../Style/auth.css";

const Login = () => {
	const { loginData, inputHandler, loginHandler } = useGlobalContext();
	const { isAuthenticated, currentUser } = useAuthContext();

	// const user = getCurrentUser();

	return !isAuthenticated ? (
		<div className="text-center">
			<main className="form-signin">
				<form>
					<h1 className="h3 mb-3 fw-normal">Sign In</h1>
					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
							placeholder="username"
							name="username"
							value={loginData.username}
							onChange={(e) => inputHandler(e, "login")}
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
							value={loginData.password}
							onChange={(e) => inputHandler(e, "login")}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<button className="btn btn-lg btn-primary" type="submit" onClick={loginHandler}>
						Sign in
					</button>
					<hr />
					<Link to="/register">
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
		</div>
	) : (
		<>
			<Redirect to="/" />
		</>
	);
};

export default withRouter(Login);
