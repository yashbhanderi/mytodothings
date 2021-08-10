import TaskInput from "./AddTask";
import TaskList from "./ListTask";
import { Link, withRouter } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { useAuthContext } from "../Auth";

import "./Style/home.css";

const Home = () => {
	const {  logoutHandler } = useGlobalContext();
	const {  isAuthenticated, currentUser, } = useAuthContext();

	// const user = getCurrentUser();

	return isAuthenticated ? (
		<>
			<div className="container py-4">
				<header className="row pb-3 mb-4 border-bottom">
					<div className="col-md-4">
						<a href="/" className="text-dark text-decoration-none">
							<span className="fs-3">To Do List</span>
						</a>
					</div>
					<button
						type="submit"
						className="col-md-2 ms-auto btn btn-primary"
						onClick={logoutHandler}>
						Logout
					</button>
				</header>
				<div className="row align-items-md-stretch">
					<TaskInput />
					<TaskList />
				</div>
			</div>
		</>
	) : (
		<>
			<div className="container py-4">
				<header className="row pb-3 mb-4 border-bottom">
					<div className="col-md-4">
						<a href="/" className="text-dark text-decoration-none">
							<span className="fs-3">To Do List</span>
						</a>
					</div>
					<Link to="/login" className="col-md-2 ms-auto btn btn-primary">
						Login
					</Link>
					<Link to="/register" className="col-md-2 ms-auto btn btn-primary">
						SignUp
					</Link>
				</header>
				<div className="row align-items-md-stretch">
                    <h3>Please Login First</h3>
				</div>
			</div>
		</>
	);
};

export default withRouter(Home);
