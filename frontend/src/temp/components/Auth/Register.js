import { Redirect, withRouter, Link } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import { useAuthContext } from "../../Auth";
import "../Style/auth.css";

const Register = () => {
	const { registerData, inputHandler, registerHandler } = useGlobalContext();
	const { isAuthenticated, currentUser } = useAuthContext();

	return !isAuthenticated ? (
		<div className="text-center">
			<main className="form-signin">
				<form>
					<h1 className="h3 mb-3 fw-normal">Register</h1>
					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="username"
							placeholder="username"
							name="username"
							value={registerData.username}
							onChange={(e) => inputHandler(e, "register")}
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
							value={registerData.email}
							onChange={(e) => inputHandler(e, "register")}
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
							value={registerData.password1}
							onChange={(e) => inputHandler(e, "register")}
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
							value={registerData.password2}
							onChange={(e) => inputHandler(e, "register")}
						/>
						<label htmlFor="password2">Password (Again)</label>
					</div>
					<button
						className="btn btn-lg btn-primary"
						type="submit"
						onClick={registerHandler}>
						Register
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
		</div>
	) : (
		<>
			<Redirect to="/" />
		</>
	);
};

export default withRouter(Register);
