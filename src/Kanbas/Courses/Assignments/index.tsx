import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate} from "react-router-dom";
import { assignments } from "../../Database";
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { Modal, Button} from 'react-bootstrap';

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
    setAssignments,
  } from "./assignmentsReducer";

import * as client from "./client";  
import { findAssignmentsForCourse, createAssignment } from "./client";
  
function Assignments() {
    const { courseId } = useParams();
    useEffect(() => {
        findAssignmentsForCourse(courseId)
          .then((assignments) =>
            dispatch(setAssignments(assignments))
        );
      }, [courseId]);   
    const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    interface Assignment {
        _id: string;
        title: string;
        course: string;
        category: string;
        description: string;
    }
    
    const handleSelectAssignment = (assignment: Assignment) => {
        dispatch(selectAssignment(assignment));
        navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
    };

    // const assignmentList = assignments.filter(
    // (assignment) => assignment.course === courseId && assignment.category === "Assignment");
    // const quizList = assignments.filter(
    //     (assignment) => assignment.course === courseId && assignment.category === "Quiz");
    // const examList = assignments.filter(
    //     (assignment) => assignment.course === courseId && assignment.category === "Exam");    
    // const projectList = assignments.filter(
    //     (assignment) => assignment.course === courseId && assignment.category === "Project");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<Assignment | null>(null);

    const handleShowDeleteModal = (assignment: Assignment) => {
        setSelectedAssignmentId(assignment);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = (e?: any) => {   // e is optional and if provided can be of any type
        if (e) e.stopPropagation();
        setSelectedAssignmentId(null);
        setShowDeleteModal(false);
    };

    const handleDeleteAssignment = (e: any) => {
        e.stopPropagation();
        if (selectedAssignmentId) {
            client.deleteAssignment(selectedAssignmentId).then((status) => {
                dispatch(deleteAssignment(selectedAssignmentId));
            });
            handleCloseDeleteModal(e);
        }
    };


    return (
        <>
        <div className="flex-fill">
            {/* {<!-- Add buttons and other fields here -->} */}
            <div style={{margin:"5px", padding:"10px"}}>
                              <li className="list-group-item d-flex justify-content-end align-items-center">
                                <div className="col float-start">
                                  
                                  <input type="text" className="form-control w-25" id="points" placeholder="Search for Assignment"/>
                                </div>
                                  <button type="button" className="btn btn-light float end m-2">
                                    + Group
                                  </button>
                                  <button type="button" className="btn btn-danger float end m-2" 
                                  onClick={() => {
                                    const newAssignment = {
                                        title: "New Assignment",
                                        description: "New Assignment Description",
                                        points: 100,
                                        dueDate: '',
                                        availableFromDate: '',
                                        availableUntilDate: '',
                                        category:'',
                                      };
                                    dispatch(selectAssignment(newAssignment));
                                    navigate(`/Kanbas/Courses/${courseId}/Assignments/new`)}}>
                                    + Assignments
                                  </button>
                                  <button type="button" className="btn btn-light float-end m-2">
                                    <FaEllipsisV/>
                                  </button>
                              </li>
                        
            </div>
            <hr style={{color:"grey", marginRight:"20px", marginLeft:"20px", marginTop:"10px", marginBottom:"10px"}} />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                        <FaCaretDown className="ms-2 me-2"/>
                        Assignments
                        
                        <span className="float-end">
                            <button className="btn btn-light rounded border border-light">
                                        40% of Total
                            </button>
                            <FaPlus className="ms-2" />
                            <FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList
                        .filter((assignment) => assignment.course === courseId  && assignment.category === "ASSIGNMENTS")
                        .map((assignment, index) => (
                        <li key={index} className="list-group-item" onClick={() => {handleSelectAssignment(assignment)}}>
                            <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                            <HiOutlinePencilSquare className="ms-3" style={{color:"green"}}/>                           
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3" >{assignment.title}</Link>
                            <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                <Link to="#" className="" style={{textDecoration: "none", color:"crimson", fontSize:"0.8em", marginLeft:"55px"}}>Multiple modules </Link> 
                                <span style={{color:"grey", fontSize:"0.8em"}}>| Due date: 2024-01-22 23:59:59 | 100pts</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success me-3" /><FaEllipsisV className="me-4" />
                                </span>
                                <button
                                    className="btn btn-danger float-end me-2"
                                    style={{height:"25px", width:"50px", borderRadius: '5px'}}
                                    onClick={(event) => {
                                        // e.preventDefault();
                                        event.stopPropagation();
                                        handleShowDeleteModal(assignment._id)}
                                    }
                                    >
                                    Delete
                                </button>

                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title >Confirm Delete</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" 
                                        onClick={(event) => {
                                            handleDeleteAssignment(event);}
                                        }
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="secondary" 
                                        onClick={handleCloseDeleteModal}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>    
                            
                        </li>))}
                    </ul>
                </li>

                <li className="list-group-item">
                    <div>
                        <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                        <FaCaretDown className="ms-2 me-2"/>
                        Quizzes
                        
                        <span className="float-end">
                            <button className="btn btn-light rounded border border-light">
                                        10% of Total
                            </button>
                            <FaPlus className="ms-2" />
                            <FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList
                        .filter((assignment) => assignment.course === courseId  && assignment.category === "QUIZZES")
                        .map((assignment, index) => (
                        <li key={index} className="list-group-item" onClick={() => handleSelectAssignment(assignment)}>
                            <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                            <HiOutlinePencilSquare className="ms-3" style={{color:"green"}}/>                           
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3">{assignment.title}</Link>
                            <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                <Link to="#" className="" style={{textDecoration: "none", color:"crimson", fontSize:"0.8em", marginLeft:"55px"}}>Multiple modules </Link> 
                                <span style={{color:"grey", fontSize:"0.8em"}}>| Due date: 2024-01-22 23:59:59 | 100pts</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success me-3" /><FaEllipsisV className="me-4" />
                                </span>
                                <button
                                    className="btn btn-danger float-end me-2"
                                    style={{height:"25px", width:"50px", borderRadius: '5px'}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleShowDeleteModal(assignment._id)}
                                    }
                                    >
                                    Delete
                                </button>

                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title >Confirm Delete</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" 
                                        onClick={(event) => {
                                            handleDeleteAssignment(event);}
                                        }
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>    
                            
                        </li>))}
                    </ul>
                </li>

                <li className="list-group-item">
                    <div>
                        <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                        <FaCaretDown className="ms-2 me-2"/>
                        Exams
                        
                        <span className="float-end">
                            <button className="btn btn-light rounded border border-light">
                                        20% of Total
                            </button>
                            <FaPlus className="ms-2" />
                            <FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList
                        .filter((assignment) => assignment.course === courseId  && assignment.category === "EXAM")
                        .map((assignment, index) => (
                        <li key={index} className="list-group-item" onClick={() => handleSelectAssignment(assignment)}>
                            <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                            <HiOutlinePencilSquare className="ms-3" style={{color:"green"}}/>                           
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3">{assignment.title}</Link>
                            <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                <Link to="#" className="" style={{textDecoration: "none", color:"crimson", fontSize:"0.8em", marginLeft:"55px"}}>Multiple modules </Link> 
                                <span style={{color:"grey", fontSize:"0.8em"}}>| Due date: 2024-01-22 23:59:59 | 100pts</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success me-3" /><FaEllipsisV className="me-4" />
                                </span>
                                <button
                                    className="btn btn-danger float-end me-2"
                                    style={{height:"25px", width:"50px", borderRadius: '5px'}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleShowDeleteModal(assignment._id)}
                                    }>
                                    Delete
                                </button>

                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title >Confirm Delete</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" 
                                        onClick={(event) => {
                                            handleDeleteAssignment(event);}
                                        }
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>    
                            
                        </li>))}
                    </ul>
                </li>

                <li className="list-group-item">
                    <div>
                        <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                        <FaCaretDown className="ms-2 me-2"/>
                        Projects
                        
                        <span className="float-end">
                            <button className="btn btn-light rounded border border-light">
                                        30% of Total
                            </button>
                            <FaPlus className="ms-2" />
                            <FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList
                        .filter((assignment) => assignment.course === courseId  && assignment.category === "PROJECT")
                        .map((assignment, index) => (
                        <li key={index} className="list-group-item" onClick={() => handleSelectAssignment(assignment)}>
                            <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                            <HiOutlinePencilSquare className="ms-3" style={{color:"green"}}/>                           
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3">{assignment.title}</Link>
                            <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                <Link to="#" className="" style={{textDecoration: "none", color:"crimson", fontSize:"0.8em", marginLeft:"55px"}}>Multiple modules </Link> 
                                <span style={{color:"grey", fontSize:"0.8em"}}>| Due date: 2024-01-22 23:59:59 | 100pts</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success me-3" /><FaEllipsisV className="me-4" />
                                </span>
                                <button
                                    className="btn btn-danger float-end me-2"
                                    style={{height:"25px", width:"50px", borderRadius: '5px'}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleShowDeleteModal(assignment._id)}
                                    }
                                    >
                                    Delete
                                </button>

                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title >Confirm Delete</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" 
                                        onClick={(event) => {
                                            handleDeleteAssignment(event);}
                                        }
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>    
                            
                        </li>))}
                    </ul>
                </li>
            </ul>
        </div>
        </>
    );
}
export default Assignments;