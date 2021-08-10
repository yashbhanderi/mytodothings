import React from "react";
import "../Style/style.css";
import { useAuthContext } from "../Auth";
import { useCrudContext } from "../Crud";

const TaskList = () => {
	const { state: authState } = useAuthContext();
	const { state, updateTaskRequest, deleteTaskHandler } = useCrudContext();

	return (
		<div className="col-md-8">
			<div className="h-100 p-4 bg-light border rounded-3">
				<h2 className="text-center">Task List</h2> <br />
				{authState.isAuth && authState.user ? (
					state.isFetching ? (
						<span className="loader">LOADING...</span>
					) : state.hasError ? (
						<span className="error">AN ERROR HAS OCCURED</span>
					) : (
						<div className="table-responsive table-fixed">
							<table className="table ">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Task</th>
										<th scope="col">Priority</th>
										<th scope="col">Status</th>
										<th scope="col">Update</th>
										<th scope="col">Delete</th>
									</tr>
								</thead>
								<tbody>
									{state.tasks.length > 0 &&
										state.tasks.map((task) => (
											<tr key={task.id}>
												<th scope="row">{task.id}</th>
												<td>{task.task}</td>
												<td>{task.priority}</td>
												<td>{task.status}</td>
												<td>
													<button
														className="btn btn-warning"
														onClick={() => updateTaskRequest(task.id)}>
														Update
													</button>
												</td>
												<td>
													<button
														className="btn btn-danger"
														onClick={() => deleteTaskHandler(task.id)}>
														Delete
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					)
				) : (
					<>
						<h1>Please Login</h1>
					</>
				)}
			</div>
		</div>
	);
};

export default TaskList;

// import React, { useEffect, useReducer } from "react";
// import axios from "axios";
// import { useGlobalContext } from "../Context";
// // import Task from "./task";

// const baseURL = "http://127.0.0.1:8000/api/";

// const initialState = {
// 	tasks: [],
// 	isFetching: false,
// 	hasError: false,
// };

// const fetchDataReducer = (state, action) => {
// 	switch (action.type) {
// 		case "FETCH_TASKS_REQUEST":
// 			return {
// 				...state,
// 				isFetching: true,
// 				hasError: false,
// 			};
// 		case "FETCH_TASKS_SUCCESS":
// 			return {
// 				...state,
// 				isFetching: false,
// 				tasks: action.payload,
// 			};
// 		case "FETCH_TASKS_FAILURE":
// 			return {
// 				...state,
// 				hasError: true,
// 				isFetching: false,
// 			};
// 		default:
// 			return state;
// 	}
// };

// const TaskList = () => {
// 	const { state: authState } = useGlobalContext();
// 	const [state, dispatch] = useReducer(fetchDataReducer, initialState);

// 	useEffect(() => {
// 		dispatch({
// 			type: "FETCH_TASKS_REQUEST",
// 		});

// 		authState.user &&
// 			axios
// 				.get(baseURL + "user/", {
// 					headers: {
// 						Authorization: "Bearer " + authState.user.access_token,
// 					},
// 				})
// 				.then((res) => {
// 					const res_data = res.data.filter(
// 						(item) => item.user === authState.user.user.pk
// 					);
// 					dispatch({
// 						type: "FETCH_TASKS_SUCCESS",
// 						payload: res_data,
// 					});
// 				})
// 				.catch((err) => {
// 					console.log(err["response"] ? err.response.data : "Network Error");
// 					dispatch({
// 						type: "FETCH_TASKS_FAILURE",
// 					});
// 				});
// 	}, [authState.user]);

// 	return (
// 		<div className="col-md-8">
// 			<div className="h-100 p-4 bg-light border rounded-3">
// 				<h2 className="text-center">Task List</h2> <br />
// 				{authState.isAuth && authState.user ? (
// 					state.isFetching ? (
// 						<span className="loader">LOADING...</span>
// 					) : state.hasError ? (
// 						<span className="error">AN ERROR HAS OCCURED</span>
// 					) : (
// 						<table className="table">
// 							<thead>
// 								<tr>
// 									<th scope="col">#</th>
// 									<th scope="col">Task</th>
// 									<th scope="col">Priority</th>
// 									<th scope="col">Status</th>
// 									<th scope="col">Update</th>
// 									<th scope="col">Delete</th>
// 								</tr>
// 							</thead>
// 							<tbody>
// 								{state.tasks.length > 0 &&
// 									state.tasks.map((task) => (
// 										<tr key={task.id} >
// 											<th scope="row">{task.id}</th>
// 											<td>{task.task}</td>
// 											<td>{task.priority}</td>
// 											<td>{task.status}</td>
// 											<td>
// 												<button className="btn btn-warning">Update</button>
// 											</td>
// 											<td>
// 												<button className="btn btn-danger">Delete</button>
// 											</td>
// 										</tr>
// 									))}
// 							</tbody>
// 						</table>
// 					)
// 				) : (
// 					<>
// 						<h1>Please Login</h1>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default TaskList;
