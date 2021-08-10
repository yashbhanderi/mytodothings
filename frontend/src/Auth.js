import React, { useEffect, useContext } from "react";

export const AppContext = React.createContext();

const initialState = {
	isAuth: false,
	user: null,
};
const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGGEDIN":
			return {
				...state,
				isAuth: true,
				user: action.payload.user,
			};
		case "SIGNUP":
			localStorage.setItem("user", JSON.stringify(action.payload));
			return {
				...state,
				isAuth: true,
				user: action.payload,
			};
		case "LOGIN":
			localStorage.setItem("user", JSON.stringify(action.payload));
			return {
				...state,
				isAuth: true,
				user: action.payload,
			};
		case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				user: null,
			};
		default:
			return state;
	}
};

export const Auth = ({ children }) => {
	const [state, dispatch] = React.useReducer(authReducer, initialState);

	console.log(state.isAuth, state.user);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || null);

		if (user) {
			dispatch({
				type: "LOGGEDIN",
				payload: {
					user: user,
				},
			});
		}
	}, []);

	return (
		<>
			<AppContext.Provider
				value={{
					state,
					dispatch,
				}}>
				{children}
			</AppContext.Provider>
		</>
	);
};

export const useAuthContext = () => {
	return useContext(AppContext);
};

export default Auth;

// localStorage.setItem(
//     "expirationDate",
//     new Date(new Date().getTime() + 3600 * 10000)
// );
