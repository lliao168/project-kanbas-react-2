import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate} from "react-router-dom";
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../../../store';
import { Modal, Button} from 'react-bootstrap';
import { RxRocket } from "react-icons/rx";
import { RiProhibitedLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
  } from "../../../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../../../Courses/Assignments/client";  
import { findAssignmentsForCourse, createAssignment } from "../../../../Courses/Assignments/client";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../../reducer"

import * as client from "../../client";  
import { findQuizzesForCourse, createQuiz } from "../../client";

function QuizDetailsEditor() {
    const { assignmentId, courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);

    const quiz = quizList.find(
        (quiz) => quiz.course === courseId && quiz._id === quizId 
    );


    const defaultAssignment = {
        title: '',
        description: '',
        points: 0,
        QuizType: '',
        shuffleAnswer: true,
        Minutes: '',
        AccessCode: '',
        dueDate: '',
        availableFromDate: '',
        availableUntilDate: '',
    };

    useEffect(() => {
        findQuizzesForCourse(courseId)
          .then((quizzes) =>
            dispatch(selectQuiz(quizzes))
        );
      }, [courseId]);   
    
    // const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);

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

    interface Assignment {
        _id: string;
        title: string;
        course: string;
        category: string;
        description: string;
        isPublished: boolean;
    }

    const [quizInstructions, setQuizInstructions] = useState('');
    const handleInstructionsChange = (value : any) => {
        setQuizInstructions(value);
        dispatch(updateQuiz({...quiz, description: value}));
    };

    const [quizTitle, setQuizTitle] = useState('');
    const handleTitleChange = (value : any) => {
        setQuizTitle(value);
        dispatch(updateQuiz({...quiz, title: value}));
    };

    const [quizPoints, setQuizPoints] = useState('');
    const handlePointsChange = (value : any) => {
        setQuizPoints(value);
        dispatch(updateQuiz({...quiz, points: value}));
    };

    const [quizType, setQuizType] = useState('');
    const handleTypeChange = (value : any) => {
        setQuizType(value);
        dispatch(updateQuiz({...quiz, QuizType: value}));
    };

    const [quizShuffleAnswer, setQuizShuffleAnswer] = useState(true);
    const handleShuffleAnswerChange = (e: any) => {
        const isChecked = e.target.checked;
        setQuizShuffleAnswer(isChecked);
        dispatch(updateQuiz({...quiz, shuffleAnswer: isChecked}));
    };

    const [quizMinutes, setQuizMinutes] = useState('');
    const handleMinutesChange = (value : any) => {
        setQuizMinutes(value);
        dispatch(updateQuiz({...quiz, Minutes: value}));
    };

    const [quizAccessCode, setQuizAccessCode] = useState('');
    const handleAccessCodeChange = (value : any) => {
        setQuizAccessCode(value);
        dispatch(updateQuiz({...quiz, AccessCode: value}));
    };

    const [quizDueDate, setQuizDueDate] = useState('');
    const handleDueDateChange = (value : any) => {
        setQuizDueDate(value);
        dispatch(updateQuiz({...quiz, dueDate : value}));
    };

    const [quizAvailableDateFrom, setQuizAvailableDateFrom] = useState('');
    const handleAvailableDateFromChange = (value : any) => {
        setQuizAvailableDateFrom(value);
        dispatch(updateQuiz({...quiz, availableFromDate : value}));
    };

    const [quizAvailableDateTo, setQuizAvailableDateTo] = useState('');
    const handleAvailableDateToChange = (value : any) => {
        setQuizAvailableDateTo(value);
        dispatch(updateQuiz({...quiz, availableUntilDate : value}));
    };



    const handleAddQuiz = () => {
        const newQuizDetails = {
            ...quiz,
            course: courseId,
        };
        if(courseId) {
            client.createQuiz(courseId, newQuizDetails).then((newQuizDetails) => {
                dispatch(addQuiz(newQuizDetails));
            });
        }
      };

    const handleUpdateQuiz = async () => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    const handleSave = () => {
        // if (!assignment.dueDate || !assignment.availableFromDate || !assignment.availableUntilDate) {
        //     alert("All date fields ('Due to', 'Available from', and 'Until') are required to save this assignment.");
        //     return;
        // }
        if (quizId && quizId !== 'new') {
            handleUpdateQuiz(); 
        } else {
            // const newAssignmentDetails = {
            //     ...assignment,
            //     course: courseId,
            //     category: assignment.category
            // };
            // dispatch(addAssignment(newAssignmentDetails));
            handleAddQuiz();
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    };

    const handleChange = (e : any) => {
        dispatch(selectQuiz({...quiz, shuffleAnswers: e.target.checked}));
    };


    
    return(
        <div className="flex-fill p-4">
            <form>
                <div className="col-12" style={{width:"500px"}}>
                        <input 
                        value={quiz.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                            className="form-control mb-2" />
                </div>   
                <div className="row g-3 justify-content-center"> 

                    <div className="col-12">
                        <label htmlFor="Quiz Instructions"
                            className="form-label mt-2">
                            Quiz Instructions:</label>
                            <ReactQuill 
                                theme="snow"
                                value={quiz.description}
                                onChange={handleInstructionsChange}
                            />
                    </div>
                </div>

                    <div className="d-grid gap-3 container text-sm-end justify-content-center mt-3">
                                        <div className="row" >
                                            <label htmlFor="quiz-type" className="col-sm-2  
                                            col-form-label col-form-label-sm">Quiz Type</label>
                                            <div className="col-sm">
                                                <select className="form-select" onChange={(e) => handleTypeChange(e.target.value)}>
                                                    <option selected>{quiz.QuizType}</option>
                                                    <option value="Graded Quiz">Graded Quiz</option>
                                                    <option value="Practice Quiz">Practice Quiz</option>
                                                    <option value="Graded Survey">Graded Survey</option>
                                                    <option value="Ungraded Survey">Ungraded Survey</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row" >
                                            <label htmlFor="points" className="col-sm-2  
                                            col-form-label col-form-label-sm">Points</label>
                                            <div className="col-sm">
                                                <input type="number" 
                                                className="form-control" 
                                                id="points" 
                                                value={quiz.points}
                                                onChange={(e) => handlePointsChange(e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="row" >
                                            <label htmlFor="quiz-group" className="col-sm-2  
                                            col-form-label col-form-label-sm">Assignment Group</label>
                                            <div className="col-sm">
                                                <select className="form-select"
                                                onChange={(e) => dispatch(selectQuiz({...quiz, category: e.target.value}))}>
                                                    <option selected>QUIZZES</option>
                                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                                    <option value="EXAM">EXAM</option>
                                                    <option value="PROJECT">PROJECT</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label htmlFor="display-grade" className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <label style={{fontWeight:"bold"}}>
                                                    Options
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox"  checked={quiz.shuffleAnswer} id="gridCheck" onChange={handleShuffleAnswerChange} />
                                                    <label className="form-check-label" htmlFor="gridCheck">
                                                    Shuffle Answers
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check d-flex">
                                                    <input className="form-check-input me-2" type="checkbox" id="gridCheck"/>
                                                    <label className="form-check-label" htmlFor="gridCheck" style={{marginRight:"50px"}}>
                                                    Time Limit
                                                    </label>
                                                    <input type="number" 
                                                        value = {quiz.Minutes}
                                                        className="form-control float-end me-2"
                                                        style={{width:"70px"}} 
                                                        id="minutes"
                                                        onChange={(e) => handleMinutesChange(e.target.value)} 
                                                    />
                                                    <label className="float-end mt-2">Minutes</label>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <label htmlFor="display-grade" className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="d-grid gap-3 col-sm border border-1 rounded">
                                                <div className="row p-2" style={{textAlign:"left"}}>
                                                    <label ></label>
                                                    <div className="col-sm">
                                                        <div className="form-check float-start">
                                                            <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                                            <label className="form-check-label" htmlFor="gridCheck">
                                                                Allow Multiple Attempts
                                                            </label>
                                                        </div>
                                                     </div>
                                                </div>
                                                
                                        
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check d-flex">
                                                    <input className="form-check-input me-2" type="checkbox" id="gridCheck"/>
                                                    <label className="form-check-label" htmlFor="gridCheck" style={{marginRight:"50px"}}>
                                                    Show Correct Answers
                                                    </label>
                                                    <input type="date" 
                                                        className="form-control float-end me-2"
                                                        style={{width:"50%"}} 
                                                        id="Show Answers Date" 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" >
                                            <label htmlFor="access code" className="col-sm-2  
                                            col-form-label col-form-label-sm">Access Code</label>
                                            <div className="col-sm">
                                                <input type="text" 
                                                className="form-control" 
                                                id="access code" 
                                                value={quiz.AccessCode}
                                                onChange={(e) => handleAccessCodeChange(e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="gridCheck" defaultChecked/>
                                                    <label className="form-check-label" htmlFor="gridCheck">
                                                    One Question at a Time
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                                    <label className="form-check-label" htmlFor="gridCheck">
                                                    Webcam Required
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{textAlign:"left"}}>
                                            <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                                            <div className="col-sm">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                                    <label className="form-check-label" htmlFor="gridCheck">
                                                    Lock Questions After Answering
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label htmlFor="display-grade" className="col-sm-2  
                                            col-form-label col-form-label-sm">Assign</label>
                                            
                                            <div className="d-grid gap-3 col-sm border border-1 rounded">
                                                
                                                <div className="row g-3">
                                                    <div className="col-12" style={{textAlign:"left"}}>
                                                        <label htmlFor="Assign to"
                                                            className="form-label mt-3"><b>
                                                            Assign to</b></label>
                                                        <div className="d-grid gap-3 col-sm border border-1 rounded">
                                                            <div>
                                                            <button type="button" className="btn btn-light float end m-2">
                                                                Everyone<FaXmark className="ms-1"/>
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                            
                                                    <div className="col-12" style={{textAlign:"left"}}>
                                                        <label htmlFor="Due"
                                                            className="form-label"><b>
                                                            Due to</b></label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="due-date"
                                                            placeholder=""
                                                            value={quiz?.dueDate}
                                                            onChange={(e) => handleDueDateChange(e.target.value)} 
                                                            />
                                                    </div>
                
                                                    <div className="col-md-6" style={{textAlign:"left"}}>
                                                        <label htmlFor="available-from" className="form-label"><b>Available from</b></label>
                                                        <input type="date" className="form-control mb-4" id="available-from" value={quiz?.availableFromDate}
                                                        onChange={(e) => handleAvailableDateFromChange(e.target.value)} />
                                                    </div>
                                                    
                                                    <div className="col-md-6" style={{textAlign:"left"}}>
                                                        <label htmlFor="until" className="form-label"><b>Until</b></label>
                                                        <input type="date" className="form-control mb-4" id="until" value={quiz?.availableUntilDate}
                                                        onChange={(e) => handleAvailableDateToChange(e.target.value)}/>
                                                    </div>
                                                    
                                                </div>  
                                                
                                                <div className="d-flex row justify-content-end">
                                                    <button type="button" className="btn btn-light border border-1">
                                                        <i className="fa-light fa-plus me-2"></i>+ Add
                                                    </button> 
                                                </div> 
                                
                                            </div>
                                        </div>
                    </div>

                    <hr style={{color:"grey", marginLeft:"20px", marginRight:"20px"}} />

                    <div className="row g-3" style={{marginLeft:"20px", marginRight:"20px"}}>
                    <div className="col-md-6 text-align:left">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck"/>
                                            <label className="form-check-label" htmlFor="gridCheck">
                                              Notify users that this quiz has changed
                                            </label>
                                        </div>
                    </div>
    
                    <div className="col-md-6 text-align:left ">
                        <button onClick={handleSave}  className="btn btn-danger ms-2 float-end">
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
            </form>
        </div>
    );
}
export default QuizDetailsEditor;