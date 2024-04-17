import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);
    const API = `${API_BASE}/a5/todos`;
    interface TodoItem {
        id: number;
        title: string;
        description: string;
        due: string;
        completed: boolean;
      }
    const [todo, setTodo] = useState<TodoItem>({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
    };
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };
    const deleteTodo = async (todo : TodoItem) => {
        try{
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error : any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const updateTodo = async () => {
        try{
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error : any) {
            console.log(error);
            setErrorMessage(error.response.data.message);

        }
    };
    
    
    const removeTodo = async (todo : TodoItem) => {
        const response = await axios
          .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
      };
    const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
    };
    const fetchTodoById = async (id : number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const encodedTitle = encodeURIComponent(todo.title);
        const response = await axios.get(`${API}/${todo.id}/title/${encodedTitle}`);
        setTodos(response.data);
    };
    
    useEffect(() => {
        fetchTodos();
    }, []);


    return (
      <div>
        <h3>Working with Arrays</h3>
        <input className="form-control mb-2" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        <input className="form-control" type="text" value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>    
        <h3>Updating an Item in an Array</h3>
        <a className="btn btn-primary mb-2" href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`} >
            Update Title to {todo.title}
        </a>

        <input className="form-control mb-2" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        <label className="form-control"> 
            <input className="me-2" type="checkbox" checked={todo.completed}
                onChange={(e) => setTodo({
                ...todo, completed: !todo.completed })}/>
             Completed   
        </label>         
        <h3>Updating the Completed Status of an Item in an Array</h3>
        <a className="btn btn-primary mb-2" href={`${API}/${todo.id}/completed/${todo.completed}`} >
            Update Completed Status {todo.completed}
        </a>

        <input className="form-control mb-2" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value) })}/>
        <input className="form-control" type="text" value={todo.description}
            onChange={(e) => setTodo({
            ...todo, description: e.target.value })}/>
        <h3>Updating the Description of an Item in an Array</h3>
        <a className="btn btn-primary mb-2" href={`${API}/${todo.id}/description/${todo.description}`} >
            Update Description to {todo.description}
        </a>


        <h4>Retrieving Arrays</h4>
        <a className="btn btn-primary" href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <div className="d-flex">
            <input className="form-control w-25 me-2" value={todo.id}
                onChange={(e) => setTodo({ ...todo,
                id: parseInt(e.target.value) })}/>
            <a className="btn btn-primary" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
        </div>    
        <h3>Filtering Array Items</h3>
        <a className="btn btn-primary" href={`${API}?completed=true`}>
            Get Completed Todos
        </a>

        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-primary" href={`${API}/create`}>
            Create Todo
        </a>

        <h3>Deleting from an Array</h3>
        <a className="btn btn-primary mb-2" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>


        <div>
            <input className="form-control mb-2" value={todo.id}    onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value)})} />
            <input className="form-control mb-2" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </div>
        <div>
            <button className="btn btn-primary mb-2" onClick={createTodo} >
                Create Todo
            </button>
        </div>
        <div>
            <button className="btn btn-success mb-2"  onClick={updateTitle} >
                Update Title
            </button>
        </div>

        <button className="btn btn-primary mb-2 me-2" onClick={postTodo}> Post Todo </button>
        <button className="btn btn-success mb-2" onClick={updateTodo}>
            Update Todo
        </button>

        {errorMessage && (
            <div className="alert alert-danger mb-2 mt-2">
            {errorMessage}
            </div>
        )}


        <ul className="list-group">
            {todos.map((todo : TodoItem) => (
            <li key={todo.id} className="list-group-item d-flex">
                <input className="me-2" checked={todo.completed}
                    type="checkbox" readOnly />
                {todo.title}
                <p>{todo.description}</p>
                <p>{todo.due}</p>
                <button className="btn btn-danger ms-2 me-2" onClick={() => removeTodo(todo)} >
                    Remove
                </button>
                <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
                    Edit
                </button>
                <button onClick={() => deleteTodo(todo)}
                    className="btn btn-danger float-end ms-2">
                    Delete
                </button>


            </li>
            ))}
        </ul>

        
      </div>
    );
  }
  export default WorkingWithArrays;
  
  