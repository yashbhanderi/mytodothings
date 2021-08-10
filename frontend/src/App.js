import { Switch, Route } from "react-router";

//Pages
import Home from "./views/app/home";
import Login from "./views/auth/login";
import Signup from "./views/auth/signup";
import Error from "./views/app/error";

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route component={Error} />
		</Switch>
	);
};

export default App;
