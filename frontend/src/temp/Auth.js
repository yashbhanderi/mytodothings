import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

export const AuthContext = React.createContext();

const Auth = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				currentUser,
				setCurrentUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export default Auth;
