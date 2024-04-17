import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { TodoType } from "../../../store";


function TodoItem( { todo }: { todo: TodoType }) {
    const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item d-flex">
        {/* <button onClick={() => deleteTodo(todo.id)}> Delete </button>
        <button onClick={() => setTodo(todo)}> Edit </button> */}
        <button className="btn btn-danger me-2" onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
        <button className="btn btn-primary me-5" onClick={() => dispatch(setTodo(todo))}> Edit </button>
        {todo.title}
      </li>
    );
  }
  export default TodoItem;