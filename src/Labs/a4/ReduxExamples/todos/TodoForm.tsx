import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { LabState } from "../../../store";


function TodoForm(
    // { todo, setTodo, addTodo, updateTodo }: {
    // todo: { id: string; title: string };
    // setTodo: (todo: { id: string; title: string }) => void;
    // addTodo: (todo: { id: string; title: string }) => void;
    // updateTodo: (todo: { id: string; title: string }) => void;
    // }
  ) {
    const { todo } = useSelector((state: LabState) => state.todosReducer);
    const dispatch = useDispatch();
    return (
      <li className="list-group-item d-flex flex-fill">
          {/* <button onClick={() => addTodo(todo)}> Add </button>
          <button onClick={() => updateTodo(todo)}> Update </button> */}
          <button className="btn btn-success me-2" onClick={() => dispatch(addTodo(todo))}> Add </button>
          <button className="btn btn-warning me-5" onClick={() => dispatch(updateTodo(todo))}> Update </button>
          <input
            value={todo.title}
            className="form-control me-5"
            style={{width:"10%"}}
          //   onChange={ (e) => setTodo({ ...todo, title: e.target.value }) 
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          />
          
      </li>
    );
  }
  export default TodoForm;
  
  