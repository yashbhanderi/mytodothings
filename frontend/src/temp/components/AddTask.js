import React from "react";
import { useGlobalContext } from "../Context";

const AddTask = () => {
	const { task, inputHandler, addTaskHandler } = useGlobalContext();

	return (
		<div className="col-md-4">
			<div className="h-100 p-5 text-white bg-dark rounded-3">
				<h2>Add Task</h2>
				<br />
				<form onSubmit={addTaskHandler}>
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
								value={task.task}
								onChange={(e, taskinput) => inputHandler(e, "taskinput")}
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
								value={task.priority}
								onChange={(e, taskinput) => inputHandler(e, "taskinput")}>
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
								value={task.status}
								onChange={(e, taskinput) => inputHandler(e, "taskinput")}
								aria-label="Default select example">
								<option value="P">Pending</option>
								<option value="C">Completed</option>
							</select>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Add Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTask;
