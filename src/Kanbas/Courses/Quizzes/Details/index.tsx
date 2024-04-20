import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { PiPencil } from "react-icons/pi";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../reducer"
 
import * as client from "../client";  
 
import { findQuizzesForCourse, createQuiz } from "../client";

function formatDate(dateString : any) {
    if (!dateString) return "Invalid date"; 
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; 
    const options: Intl.DateTimeFormatOptions = {
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date).replace(',', ' at');
}

function QuizDetailsScreen() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
        .then((quizzes) =>
            dispatch(selectQuiz(quizzes))
        );
  }, [courseId]);  
const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);

// const quiz = quizList.find((quiz) => quiz.course === courseId && quiz._id === quizId );
const quiz = quizList.find(q => q.course === courseId && q._id === quizId);    
// has context menu
    interface quiz {
        _id: string;
        title: string;
        course: string;
        category: string;
        description: string;
        isPublished: boolean;
    }

    const handleEditClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Editor`);
    };

    const handlePreviewClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`);
    }


    return (
        <div>
            <div style={{ margin: "5px", padding: "10px" }}>
                <li className="list-group-item d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-success float end m-2">
                        <FaCheckCircle />
                        <span className="m-1">Published</span>
                    </button>
                    <button type="button" className="btn float btn-light end m-2" onClick={handlePreviewClick}>
                        Preview
                    </button>
                    {quiz && (
                        <button type="button" onClick={handleEditClick} className="btn btn-light float-end m-2">
                            <PiPencil /> Edit
                        </button>
                    )}
                    <button type="button" className="btn btn-light float-end m-2">
                        <FaEllipsisV />
                    </button>
                </li>
            </div>
            <hr style={{ color: "grey", marginRight: "20px", marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }} />
            {/* Quiz information */}
            <h1 style={{fontFamily: 'Arial, sans-serif', marginLeft: "20px"}} className="mb-5">{quiz && quiz.title}</h1>
            <div className="d-grid gap-3 container text-sm-end justify-content-center mt-3 float-start">
                <ul>
                    <li style={{ display: "flex", alignItems: "center"}} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Quiz Type</h3>
                        <p style={{ margin: "0", fontSize: "15pt" , textAlign:"left"}}>{quiz && quiz.QuizType}</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", textAlign:"right" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Points</h3>
                        <p style={{ margin: "0", fontSize: "15pt", textAlign:"left" }}>{quiz && quiz.points}</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Assignment Group</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.category}</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Shuffle Answers</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.shuffleAnswers ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>No</p>}</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Time Limit</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.Minutes} Minutes</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Multiple Attempts</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.multipleAttempts ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>No</p>} </p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Show Correct Answers</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.showCorrectAnswersCheck ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>No</p>} </p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">One Question at a Time</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.OneQuestionAtATime ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>No</p>}</p>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Webcam Required</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.WebCam ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p>}</p>
                    </li>
                    <li className="mb-5" style={{ display: "flex", alignItems: "center" }}>
                        <h3 style={{ margin: "0 10px 0 0", fontSize:"20px", textAlign:"right"}} className="me-3">Lock Questions After Answering</h3>
                        <p style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.lockQuestionAfterAnswering ? <p style={{ margin: "0", fontSize: "15pt" }}>Yes</p> : <p style={{ margin: "0", fontSize: "15pt" }}>No</p>}</p>
                    </li>
                </ul>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available from</th>
                        <th>Until</th>
                    </tr>    
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {formatDate(quiz && quiz.dueDate)}
                        </td>
                        <td>
                            Everyone
                        </td>
                        <td>
                            {formatDate(quiz && quiz.availableFromDate)}
                        </td>
                        <td>
                            {formatDate(quiz && quiz.availableUntilDate)}
                        </td>
                    </tr>    
                </tbody>    
            </table>

        </div>

    );

}
export default QuizDetailsScreen;