import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../Config/Api";
import AxiosAPI from "../../Helpers/AxiosAPI";

const TodoList = () => {
    let [todos, setTodos] = useState([]);

    useEffect(() => {
        // fetch(`${BASE_URL}/todos`)
        // .then((response) => response.json())
        // .then((res) => {
        // setTodos(res);
        // });
        getTodos();
    }, []);

    const deleteTodo = (id) => {
        AxiosAPI.delete(`${BASE_URL}/todos/${id}`);
        getTodos();
    };

    const changeStatus = (todo) => {
        AxiosAPI.put(`${BASE_URL}/todos/${
            todo.id
        }`, {
            ...todo,
            status: "Completed"
        });
        getTodos();
    };

    const getTodos = () => {
        AxiosAPI.get(`${BASE_URL}/todos`).then((res) => setTodos(res)).catch((err) => console.log("Err: ", err));
    };

    return (
        <>
            <div className="row">
                <div className="col-10 mx-auto">
                    <div className="h2 my-3">
                        <span>Todo List</span>
                        <button className="btn btn-outline-warning float-end ms-3"
                            onClick={getTodos}>
                            <i className="fa-solid fa-rotate" title="Reload"></i>
                        </button>
                        <Link to="/create" className="btn btn-outline-primary float-end">
                            <i className="fa-regular fa-calendar-plus" title="Create"></i>
                        </Link>
                    </div>
                    <div className="card shadow">
                        <div className="card-body p-0">
                            <table className="table border m-0">
                                <thead className="table-secondary">
                                    <tr> {/* <th>#</th> */}
                                        <th>Task</th>
                                        <th style={
                                            {width: "115px"}
                                        }>Date & Time</th>
                                        <th>Status</th>
                                        <th style={
                                                {width: "150px"}
                                            }
                                            className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody> {
                                    todos.length > 0 ? (todos.reverse().map((todo, i) => (
                                        <tr className=" align-middle"
                                            key={i}>
                                            {/* <th>{todo.id}</th> */}
                                            <td>{
                                                todo.task
                                            }</td>
                                            <td>{
                                                todo.date
                                            }</td>
                                            <td>
                                                <span className={
                                                    todo.status === "Completed" ? "badge rounded-pill text-bg-primary px-3 py-2" : "badge rounded-pill text-bg-warning px-3 py-2"
                                                }>
                                                    {
                                                    todo.status
                                                }</span>
                                            </td>
                                            <td className="text-center">

                                                {
                                                todo.status === "In Progress" ? (
                                                    <>
                                                        <span className="cursor p-2"
                                                            onClick={
                                                                () => changeStatus(todo)
                                                        }>
                                                            <i className="fa-solid fa-check text-info" title=" Change to Completed"></i>
                                                        </span>
                                                        <span className="cursor p-2"
                                                            onClick={
                                                                () => deleteTodo(todo.id)
                                                        }>
                                                            <i className="fa-solid fa-trash text-danger" title="Delete"></i>
                                                        </span>
                                                    </>
                                                ) : <span className="cursor p-2"
                                                        onClick={
                                                            () => deleteTodo(todo.id)
                                                    }>
                                                        <i className="fa-solid fa-trash text-danger" title="Delete"></i>
                                                    </span>
                                            } </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <th className="text-center"
                                                colSpan={10}>
                                                No todos found!
                                            </th>
                                        </tr>
                                    )
                                } </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoList;
