import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { useAuthContext } from "./Auth";
import TaskUpdate from "./components/taskupdate";

const baseURL = "http://127.0.0.1:8000/api/";

export const CrudContext = React.createContext();

const initialState = {
	tasks: [],
	isFetching: false,
	hasError: false,

	//POST, UPDATE, DELETE
	isUpdate: false,
	taskForUpdate: {},
	loading: false,
	error: false,
};

const CrudReducer = (state, action) => {
	switch (action.type) {
		// GET
		case "FETCH_TASKS_REQUEST":
			return {
				...state,
				isFetching: true,
				hasError: false,
			};
		case "FETCH_TASKS_SUCCESS":
			return {
				...state,
				isFetching: false,
				tasks: action.payload,
			};
		case "FETCH_TASKS_FAILURE":
			return {
				...state,
				hasError: true,
				isFetching: false,
			};

		// POST
		case "POST_TASKS":
			return {
				...state,
				tasks: [...state.tasks, { ...action.payload.data, id: action.payload.id }],
			};

		// PUT
		case "UPDATE_TASKS_REQUEST":
			return {
				...state,
				isUpdate: true,
				taskForUpdate: state.tasks.filter((item) => item.id === action.payload.id)[0],
			};

		case "UPDATE_TASKS_SUCCESS":
			const updatedData = action.payload;

			const updatedTasks = state.tasks.map((item) => {
				if (item.id === updatedData.id) {
					return updatedData;
				}
				return item;
			});

			return {
				...state,
				isUpdate: false,
				tasks: updatedTasks,
				taskForUpdate: {},
			};

		case "UPDATE_TASKS_CLOSE":
			return {
				...state,
				isUpdate: false,
				taskForUpdate: {},
			};

		//DELETE
		case "DELETE_TASKS":
			return {
				...state,
				tasks: state.tasks.filter((item) => item.id !== action.payload.id),
			};

		default:
			return state;
	}
};

export const CRUD = ({ children }) => {
	const { state: authState } = useAuthContext();
	const [state, dispatch] = useReducer(CrudReducer, initialState);

	//GET
	useEffect(() => {
		dispatch({
			type: "FETCH_TASKS_REQUEST",
		});

		authState.user &&
			axios
				.get(baseURL + "user/", {
					headers: {
						Authorization: "Bearer " + authState.user.access_token,
					},
				})
				.then((res) => {
					const res_data = res.data.filter(
						(item) => item.user === authState.user.user.pk
					);
					dispatch({
						type: "FETCH_TASKS_SUCCESS",
						payload: res_data,
					});
				})
				.catch((err) => {
					console.log(err["response"] ? err.response.data : "Network Error");
					dispatch({
						type: "FETCH_TASKS_FAILURE",
					});
				});
	}, [authState.user]);

	//POST
	const addTaskHandler = (e, data) => {
		e.preventDefault();
		console.log(data);

		if (authState.isAuth === false) {
			alert("Please Login First!");
			return;
		}

		data["user"] = authState.user.user.pk;

		axios
			.post(baseURL + "user/", data, {
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + authState.user.access_token,
				},
			})
			.then((res) => {
				console.log("Ok Created", res);
				dispatch({
					type: "POST_TASKS",
					payload: {
						data: data,
						id: res.data.id,
					},
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//UPDATE
	const updateTaskRequest = (id) => {
		console.log("Updated", id);
		dispatch({ type: "UPDATE_TASKS_REQUEST", payload: { id: id } });
	};

	const updateTaskHandler = (data) => {
		console.log(data);

		axios
			.put(baseURL + "user/" + data.id + "/", data, {
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + authState.user.access_token,
				},
			})
			.then((res) => {
				dispatch({
					type: "UPDATE_TASKS_SUCCESS",
					payload: data,
				});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
		dispatch({ type: "UPDATE_TASKS_CLOSE" });
	};

	//DELETE
	const deleteTaskHandler = (id) => {
		axios
			.delete(baseURL + "user/" + id + "/", {
				headers: {
					Authorization: "Bearer " + authState.user.access_token,
				},
			})
			.then((res) => {
				console.log("Ok Deleted");
				dispatch({
					type: "DELETE_TASKS",
					payload: {
						id: id,
					},
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<CrudContext.Provider
				value={{
					state,
					dispatch,

					//CRUD
					addTaskHandler,
					updateTaskRequest,
					updateTaskHandler,
					deleteTaskHandler,
				}}>
				{state.isUpdate && <TaskUpdate />}
				{children}
			</CrudContext.Provider>
		</>
	);
};

export const useCrudContext = () => {
	return useContext(CrudContext);
};

export default CRUD;
