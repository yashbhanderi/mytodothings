import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Error from "./components/Error";
import { Switch, Route } from "react-router";
import { useAuthContext } from "./Auth";
import { useGlobalContext } from "./Context";
import { useEffect } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const App = () => {
	const { isAuthenticated, currentUser, setIsAuthenticated, setCurrentUser } = useAuthContext();
	const { task, setTask } = useGlobalContext();

	console.log(isAuthenticated, currentUser);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

        console.log( "App useEffect" );
		if (user) {
			setIsAuthenticated(true);
			setCurrentUser(user);
			setTask({ ...task, user: user.user.pk });
		}
	}, []);

	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route component={Error} />
		</Switch>
	);
};

export default App;
