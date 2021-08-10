import React from "react";

//components
import Header from "../../components/header";
import TaskBox from "../../components/taskbox";
import TaskList from "../../components/tasklist";

const Home = () => {
	return (
		<div className="container py-4">
			<Header />
			<div className="row align-items-md-stretch">
				<TaskBox />
				<TaskList />
			</div>
		</div>
	);
};

export default Home;
