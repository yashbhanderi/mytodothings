import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth";

function Header() {
	const { state, dispatch } = useAuthContext();

	return (
		<header className="row pb-3 mb-4 border-bottom">
			<div className="col-md-4">
				<Link to="/" className="text-dark text-decoration-none">
					<span className="fs-3">To Do List</span>
				</Link>
			</div>
			{state.isAuth ? (
				<>
					<button
						className="col-md-2 ms-auto btn btn-primary"
						type="button"
						onClick={() =>
							dispatch({
								type: "LOGOUT",
							})
						}>
						Log Out
					</button>
				</>
			) : (
				<>
					<div className="col-md-2 ms-auto">
						<Link to="/login">
							<button className="btn btn-primary" type="button">
								Log In
							</button>
						</Link>{" "}
						&nbsp;
						<Link to="/signup">
							<button className="btn btn-primary" type="button">
								Sign Up
							</button>
						</Link>
					</div>
				</>
			)}
		</header>
	);
}

export default Header;
