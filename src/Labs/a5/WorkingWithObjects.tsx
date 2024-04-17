import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

  const [module, setModule] = useState({
    id: 2, name: "Module 1",
    description: "This is a NodeJS Module",
    course: "NodeJS course",
  });
  const MODULE_URL = `${API_BASE}/a5/module`

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);


  
  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <div className="d-flex mb-2">
        <input className="form-control w-25 me-2" onChange={(e) => setAssignment({
                ...assignment, title: e.target.value })}
            value={assignment.title} type="text" />
        <button className="btn btn-primary me-2" onClick={updateTitle} >
            Update Title to: {assignment.title}
        </button>
        <button className="btn btn-primary" onClick={fetchAssignment} >
            Fetch Assignment
        </button>
    </div>   

      <div className="d-flex mb-2">
        <input className="form-control w-25 me-2" type="text" 
            onChange={(e) => setAssignment({ ...assignment,
                title: e.target.value })}
            value={assignment.title}/>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
            Update Assignment Title
        </a> 
      </div> 

      <div className="d-flex mb-2">
        <input className="form-control w-25 me-2" type="number" 
            onChange={(e) => setAssignment({ ...assignment,
                score: parseInt(e.target.value) })}
            value={assignment.score}/>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
            Update Assignment Score
        </a> 
      </div>  

      <div className="d-flex mb-2">
      <label className="form-control w-25 me-2">
        <input className="me-2" type="checkbox"  checked={assignment.completed}
            onChange={(e) => setAssignment({ ...assignment,
                completed: !assignment.completed })}
               />
        Completed       
      </label>         
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
            Update Assignment Completed Status
        </a> 
      </div>    
      
      <div className="d-flex mb-2">
        <input className="form-control w-25 me-2" type="text" 
            onChange={(e) => setModule({ ...module,
                name: e.target.value })}
            value={module.name}/>
        <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
            Update Module Name
        </a> 
      </div> 

      <div className="d-flex">
        <input className="form-control w-25 me-2" type="text" 
            onChange={(e) => setModule({ ...module,
                description: e.target.value })}
            value={module.description}/>
        <a className="btn btn-primary" href={`${MODULE_URL}/description/${module.description}`}>
            Update Module Description
        </a> 
      </div> 

      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/module`}>
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/module/name`}>
        Get Module Name
      </a>
    </div>
  );
}
export default WorkingWithObjects;

