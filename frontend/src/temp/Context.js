import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "./Auth";
import UpdateTask from "./components/UpdateTask";

const baseURL = "http://127.0.0.1:8000/api/";

export const AppContext = React.createContext();

const Context = ({ children }) => {
	const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useAuthContext();

	const [task, setTask] = useState({
		task: "",
		priority: "1",
		status: "P",
		user: 0,
	});
	const [list, setList] = useState([]);
	const [update, setUpdate] = useState(null);
	const [registerData, setRegisterData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		isAuthenticated &&
			axios
				.get(baseURL + "user/", {
					headers: {
						Authorization: "Bearer " + currentUser.access_token,
					},
				})
				.then((res) => {
					setList(res.data.filter((item) => item.user === currentUser.user.pk));
				})
				.catch((err) => {
					console.log(err);
				});

		// console.log( user.access_token );
		console.log(isAuthenticated, currentUser);
	}, [currentUser]);

	const addTaskHandler = (e) => {
		e.preventDefault();

		axios
			.post(baseURL + "user/", task, {
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + currentUser.access_token,
				},
			})
			.then((res) => {
				console.log("Ok Created", res);
				setList([...list, { ...task, id: res.data.id }]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [show, setShow] = useState(false);

	const [taskUpdate, setTaskUpdate] = useState({
		task: "",
		priority: "1",
		status: "P",
		user: 0,
	});
	const updateHandler = (id) => {
		setShow(true);
		setUpdate(id);
		axios
			.get(baseURL + "user/" + id + "/", {
				headers: {
					Authorization: "Bearer " + currentUser.access_token,
				},
			})
			.then((res) => {
				setTaskUpdate(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteTaskHandler = (id) => {
		setList(list.filter((item) => item.id !== id));
		axios
			.delete(baseURL + "user/" + id, {
				headers: {
					Authorization: "Bearer " + currentUser.access_token,
				},
			})
			.then((res) => {
				console.log("Ok Deleted");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Auth

	const registerHandler = (e) => {
		e.preventDefault();

		axios
			.post(baseURL + "register/", registerData)
			.then((response) => {
				console.log(response.data);
				const user = JSON.stringify(response.data);
				localStorage.setItem("user", user);
				localStorage.setItem(
					"expirationDate",
					new Date(new Date().getTime() + 3600 * 10000)
				);
				setIsAuthenticated(true);
				setCurrentUser(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loginHandler = (e) => {
		e.preventDefault();

		axios
			.post(baseURL + "login/", loginData)
			.then((response) => {
				console.log(response.data);
				const user = JSON.stringify(response.data);
				localStorage.setItem("user", user);
				localStorage.setItem(
					"expirationDate",
					new Date(new Date().getTime() + 3600 * 10000)
				);
				setIsAuthenticated(true);
				setCurrentUser(user);
				setTask({ ...task, user: user.pk });
				setTaskUpdate({ ...taskUpdate, user: user.pk });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const logoutHandler = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("expirationDate");
		setIsAuthenticated(false);
		setCurrentUser(null);
	};

	// ----------------------------------- Common ----------------------------------------//

	const inputHandler = (e, type) => {
		const name = e.target.name;
		const value = e.target.value;

		switch (type) {
			case "taskinput":
				setTask({
					...task,
					[name]: value,
				});
				break;
			case "register":
				setRegisterData({
					...registerData,
					[name]: value,
				});
				break;
			case "login":
				setLoginData({
					...loginData,
					[name]: value,
				});
				break;
			default:
				alert("wrong input");
		}
	};

	// ----------------------------------- Render ----------------------------------------//

	return (
		<>
			<AppContext.Provider
				value={{
					//states
					task,
					list,
					registerData,
					loginData,
					currentUser,
					update,
					setTask,
					show,
					setShow,
					taskUpdate,
					setTaskUpdate,
					// isAuthenticated,
					setUpdate,

					// Functions

					inputHandler, // onChange => State

					addTaskHandler, // onSubmit Task => POST Request for New Task
					updateHandler,
					deleteTaskHandler,

					loginHandler,
					logoutHandler,
					registerHandler,
					// setCurrentUser,
				}}>
				{show && <UpdateTask />}
				{children}
			</AppContext.Provider>
		</>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export default Context;
