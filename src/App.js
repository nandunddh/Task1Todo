import { useState } from "react";
import { Route, Routes } from "react-router-dom";


import Navbar from "./Components/Navbar";
import CreateTodo from "./Components/Todo/CreateTodo";
import TodoList from "./Components/Todo/TodoList";

import StoreContext from "./StoreContext";

import "./app.css";
import CompletedList from "./Components/Todo/CompletedList";
import PendingList from "./Components/Todo/PendingList";



const App = () => {
	let user = localStorage.getItem("user");
	user = user ? JSON.parse(user) : null;

	const [data, setStore] = useState({ user });

	const setManageStore = (data) => {
		console.log("Manage", data)
		setStore(data);
	};

	return (
		<>
			<StoreContext.Provider value={{ store: data, manageStore: setManageStore }}>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<TodoList />} />
						<Route path="create" element={<CreateTodo />} />
						<Route path="completed" element={<CompletedList />} />
						<Route path="pending" element={<PendingList />} />
					


					</Routes>
				</div>
			</StoreContext.Provider>
		</>
	);
};

export default App;
