import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../Context";
import { Redirect } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const UpdateTask = () => {
	const { currentUser, taskUpdate, setTaskUpdate, setTask, show, setShow, update, setUpdate } =
		useGlobalContext();

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setTaskUpdate({ ...taskUpdate, [name]: value });
	};

	const changeSubmit = (e) => {
        // e.preventDefault();
		axios
			.put(baseURL + "user/" + update + "/", taskUpdate, {
				headers: {
					Authorization: "Bearer " + currentUser.access_token,
				},
			})
			.then((res) => {
				setTask(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClose = () => {
		setShow(false);
		setUpdate(true);
	};
    
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={(e)=>changeSubmit(e)}>
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
									value={taskUpdate.task}
									onChange={(e) => changeHandler(e)}
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
									value={taskUpdate.priority}
									onChange={(e) => changeHandler(e)}>
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
									value={taskUpdate.status}
									onChange={(e) => changeHandler(e)}
									aria-label="Default select example">
									<option value="P">Pending</option>
									<option value="C">Completed</option>
								</select>
							</div>
						</div>
						<button type="submit" className="btn btn-primary">
							Save Changes
						</button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default UpdateTask;
