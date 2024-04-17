import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../../store';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { RiProhibitedLine } from "react-icons/ri";
import QuizDetailsEditor from './DetailsEditor';

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
  } from "../../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../../Courses/Assignments/client";  
import { findAssignmentsForCourse, createAssignment } from "../../../Courses/Assignments/client";
import QuizQuestionsDetailEditor from './QuestionsEditor';

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../reducer"

import * as client from "../client";  

import { findQuizzesForCourse, createQuiz } from "../client";


function QuizEditor () {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
          .then((quizzes) =>
            dispatch(selectQuiz(quizzes))
        );
      }, [courseId]);   
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    interface Assignment {
        _id: string;
        title: string;
        course: string;
        category: string;
        description: string;
        isPublished: boolean;
    }
    
    interface Quiz {
        _id: string;
        title: string;
        course: string;
        description: string;
        isPublished: boolean;
        points: Number;
        dueDate: Date;
        availableFromDate: Date;
        availableUntilDate: Date;
        pts: Number;
        Questions: Number;
        shuffleAnswer: Boolean;
        QuizType: String;
        Minutes: Number;
        AccessCode: Number;
    }

    const handleSelectAssignment = (assignment: Assignment) => {
        dispatch(selectAssignment(assignment));
        navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
    };

    const [activeTab, setActiveTab] = useState('Details');
    const [quizTitle, setQuizTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveQuiz = () => {

    };

    const publishQuiz = () => {

    };

    const cancelEditing = () => {

    };

    const tabStyle = {
        padding: "10px",
        cursor: "pointer",
        border: "3px solid transparent",
        borderBottom: "none",
        color: "crimson",
    };

    const activeTabStyle = {
        ...tabStyle,
        color: "black",
        textDecoration: "underline",

    };

    return (
        <div>

            <div>
                <li className="list-group-item d-flex justify-content-end align-items-center buttons mt-3">
                    <div className="dropdown">
                        <span className="me-3">Points 0</span>
                        <span className="me-2" style={{color:"grey"}}>
                            <RiProhibitedLine className="me-2" style={{color:"grey"}}/>Not Published
                        </span>
                    </div>
                    <button type="button" className="btn btn-light float-end m-1">
                        <FaEllipsisV/>
                    </button>
                </li>

                <hr style={{color:"grey", marginLeft:"20px", marginRight:"20px"}} />
            </div>

            <div>
                <nav className="nav nav-tabs" style={{display:"flex", justifyContent:"start", borderBottom:"1px solid #ccc", marginLeft:"20px", marginRight:"20px"}}>
                    <div className="nav-item" style={activeTab === "Details" ? activeTabStyle : tabStyle} onClick={() => setActiveTab("Details")}>
                            Details
                    </div>
                    <div className="nav-item" style={activeTab === "Questions" ? activeTabStyle : tabStyle} onClick={() => setActiveTab("Questions")}>
                            Questions
                    </div>
                </nav>
            </div>
            <div>
                {activeTab === "Details" && <QuizDetailsEditor />}
                {activeTab === "Questions" && <QuizQuestionsDetailEditor />}
            </div>
            {/* <hr style={{color:"grey", marginLeft:"20px", marginRight:"20px"}} /> */}

            {/* <form>
                <div className="row g-3" style={{marginLeft:"20px", marginRight:"20px"}}>
                    <div className="col-md-6 text-align:left">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                            <label className="form-check-label" htmlFor="gridCheck">
                                              Notify users that this quiz has changed
                                            </label>
                                        </div>
                    </div>
    
                    <div className="col-md-6 text-align:left">
                        <button className="btn btn-danger ms-2 float-end">
                        Save
                        </button>
                        <Link to={"#"} className="btn btn-light float-end ms-2">
                            Save & Publish
                        </Link>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            onClick={() => {navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}} className="btn btn-light float-end">
                            Cancel
                        </Link>
                    </div>    
                </div>    
            </form> */}

            
        </div>

        
    );



};
export default QuizEditor;