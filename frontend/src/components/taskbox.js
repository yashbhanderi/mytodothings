import React, { useState } from "react";
import { useCrudContext } from "../Crud";

const initialState = {
	task: "",
	priority: "1",
	status: "P",
};

const TaskBox = () => {
	const { addTaskHandler } = useCrudContext();
	const [data, setData] = useState(initialState);

	const handleInputChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="col-md-4">
			<div className="h-100 p-5 text-white bg-dark rounded-3">
				<h2>Add Task</h2>
				<br />
				<form>
					<div className="row mb-3">
						<label htmlFor="inputTask" className="col-sm-3 col-form-label">
							Task
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								id="inputTask"
								name="task"
								value={data.task}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="priority" className="col-sm-3 col-form-label">
							Priority
						</label>
						<div className="col-sm-10">
							<select
								id="priority"
								className="form-select"
								name="priority"
								value={data.priority}
								onChange={handleInputChange}>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="status" className="col-sm-3 col-form-label">
							Status
						</label>
						<div className="col-sm-10">
							<select
								id="status"
								className="form-select"
								name="status"
								value={data.status}
								onChange={handleInputChange}
								aria-label="Default select example">
								<option value="P">Pending</option>
								<option value="C">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => {
							addTaskHandler(e, data);
							setData(initialState);
						}}>
						Add Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskBox;
