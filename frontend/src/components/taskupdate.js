import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCrudContext } from "../Crud";

const TaskUpdate = () => {
	const { state, dispatch, updateTaskHandler } = useCrudContext();

	const [taskData, setTaskData] = useState(state.taskForUpdate);

	const handleClose = () => dispatch({ type: "UPDATE_TASKS_CLOSE" });

	const handleInputChange = (e) => {
		setTaskData({
			...taskData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Modal show={state.isUpdate} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Update Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
								value={taskData.task}
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
								value={taskData.priority}
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
								value={taskData.status}
								onChange={handleInputChange}
								aria-label="Default select example">
								<option value="P">Pending</option>
								<option value="C">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => updateTaskHandler(taskData)}>
						Save Changes
					</button>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default TaskUpdate;
