import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import AxiosAPI from "../../Helpers/AxiosAPI";

const CreateTodo = () => {
	const formFields = ["task", "date", "time"];
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {};
		let isError = false;

		isError = formFields.map((ele) => {
			const value = e.target[ele].value;

			if (value) {
				if (ele === "time") {
					let newDate = moment(`${data.date} ${value}`).format("Do MMM, YYYY h:mm A");
					data = { ...data, date: newDate };
				} else {
					data = { ...data, [ele]: value };
				}

				return false;
			} else {
				alert(`Please enter ${ele}!`);
				return true;
			}
		});

		if (!isError.includes(true)) {
			data = { ...data, status: "In Progress" };

			AxiosAPI.post("/todos", data)
				.then((res) => {
					navigate("/");
				})
				.catch((err) => {
					console.log("Create Err: ", err);
				});
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-10 mx-auto">
					<div className="h2 my-3">
						<span>Craate Todo</span>
						<Link to="/" className="btn btn-outline-secondary float-end">
							<i className="fa-solid fa-arrow-left"></i>
						</Link>
					</div>
					<div className="card shadow">
						<div className="card-body">
							<form className="row" onSubmit={handleSubmit}>
								<div className="mb-3 col-6">
									<label className="form-label">Task</label>
									<textarea className="form-control" name="task" />
								</div>
								<div className="mb-3 col-3">
									<label className="form-label">Date</label>
									<input type="date" className="form-control" name="date" />
								</div>
								<div className="mb-3 col-3">
									<label className="form-label">Time</label>
									<input type="time" className="form-control" name="time" />
								</div>
								<div className="col-12 text-end">
									<button className="btn btn-outline-success px-5" type="submit">
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateTodo;
