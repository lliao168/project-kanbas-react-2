import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { PiPencil } from "react-icons/pi";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaArrowRightFromBracket, FaBan, FaChartSimple, FaCircle, FaCircleCheck, FaFileImport, FaXmark } from "react-icons/fa6";
import { RiProhibitedLine } from "react-icons/ri";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../reducer"

import * as client from "../client";

import { findQuizzesForCourse, createQuiz } from "../client";

function formatDate(dateString: any) {
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

function QuizDetailsScreen({ profile }: any) {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(selectQuiz(quizzes))
            );
    }, [courseId, dispatch]);

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

    const [quizPublish, updatePublish] = useState(quiz ? quiz.isPublished : false);

    const handlePublish = (quizId: any | null, e: any) => {
        e.preventDefault();
        if (!quizId) return;
        const quiz = quizList.find(q => q._id === quizId);
        if (quiz) {
            const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
            client.updateQuiz(updatedQuiz).then(() => {
                dispatch(updateQuiz(updatedQuiz));
            })
        }
    };

    const handleEditClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Editor`);
    };

    const handlePreviewClick = () => {
        if (quiz?._id) {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`);
        }
    }


    return (
        <div>
            {/* <button onClick={() => console.log(profile)}>Click Me</button> */}
            {profile && (profile.role === "ADMIN" || profile.role === "FACULTY") && (
                <>
                
                    <div style={{ margin: "5px", padding: "10px" }}>
                        <li className="list-group-item d-flex justify-content-end align-items-center">
                            {quiz ? (
                                quiz && quiz.isPublished ? (
                                    <button className="btn btn-success float-end m-2" onClick={(e) => handlePublish(quiz._id, e)}>
                                        <FaCircleCheck style={{ color: "white" }} /> Published</button>
                                ) : (
                                    <button className="btn btn-light float-end m-2" onClick={(e) => handlePublish(quiz._id, e)} >
                                        <RiProhibitedLine className="text-muted me-1" />
                                        Unpublish</button>)
                            ) : (
                                <p>Loading...</p>
                            )}
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
                </>
            )}
            <hr style={{ color: "grey", marginRight: "20px", marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }} />
            {/* Quiz information */}
            <h1 style={{ fontFamily: 'Arial, sans-serif', marginLeft: "20px" }} className="mb-5">{quiz && quiz.title}</h1>
            <div className="d-grid gap-3 container text-sm-end justify-content-center mt-3 float-start">
                <ul>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Quiz Type</h3>
                        <span style={{ margin: "0", fontSize: "15pt", textAlign: "left" }}>{quiz && quiz.QuizType}</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", textAlign: "right" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Points</h3>
                        <span style={{ margin: "0", fontSize: "15pt", textAlign: "left" }}>{quiz && quiz.points}</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Assignment Group</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.category}</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Shuffle Answers</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.shuffleAnswers ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>}</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Time Limit</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.Minutes} Minutes</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Multiple Attempts</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.multipleAttempts ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>} </span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Show Correct Answers</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.showCorrectAnswersCheck ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>} </span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Access Code</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.AccessCode} </span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">One Question at a Time</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.OneQuestionAtATime ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>}</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }} className="mb-2">
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Webcam Required</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.WebCam ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>}</span>
                    </li>
                    <li className="mb-5" style={{ display: "flex", alignItems: "center" }}>
                        <h3 style={{ margin: "0 10px 0 0", fontSize: "20px", textAlign: "right" }} className="me-3">Lock Questions After Answering</h3>
                        <span style={{ margin: "0", fontSize: "15pt" }}>{quiz && quiz.lockQuestionAfterAnswering ? <span style={{ margin: "0", fontSize: "15pt" }}>Yes</span> : <span style={{ margin: "0", fontSize: "15pt" }}>No</span>}</span>
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