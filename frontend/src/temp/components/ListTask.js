// import React, { useEffect, useRef, useMemo } from "react";
import { useGlobalContext } from "../Context";


const ListTask = () => {
	// const { list, updateHandler, deleteTaskHandler } = useGlobalContext();

	// let renderItems = [];
	// if (list.length > 0) {
	// 	renderItems = list.map((item) => (
	// 		<tr key={item.id}>
	// 			<th scope="row">{item.id}</th>
	// 			<td>{item.task}</td>
	// 			<td>{item.priority}</td>
	// 			<td>{item.status}</td>
	// 			<td>
	// 				<button className="btn btn-warning" onClick={() => updateHandler(item.id)}>
	// 					Update
	// 				</button>
	// 			</td>
	// 			<td>
	// 				<button className="btn btn-danger" onClick={() => deleteTaskHandler(item.id)}>
	// 					Delete
	// 				</button>
	// 			</td>
	// 		</tr>
	// 	));
	// }

	return (
		<div className="col-md-8">
			<div className="h-100 p-4 bg-light border rounded-3">
				<h2 className="text-center">Task List</h2> <br />
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Task</th>
							<th scope="col">Priority</th>
							<th scope="col">Status</th>
							<th scope="col">Update</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	);
};

export default ListTask;
