import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../../store';
import { Modal, Button } from 'react-bootstrap';
import { RxRocket } from "react-icons/rx";
import { RiProhibitedLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CiSearch } from "react-icons/ci";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CgPentagonRight } from "react-icons/cg";
import { GoTriangleRight } from "react-icons/go";
import { PiPencil } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
} from "../../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../../Courses/Assignments/client";  
import { findAssignmentsForCourse, createAssignment } from "../../../Courses/Assignments/client";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../reducer"

import QuizMultipleChoiceEditor from '../Editor/QuestionsEditor/MultipleChoice';
import QuizTrueFalseEditor from '../Editor/QuestionsEditor/TrueFalse';
import QuizFillBlankEditor from '../Editor/QuestionsEditor/FillBlank';

import * as client from "../Editor/QuestionsEditor/client";
import { Question, Blank, TrueFalse, Choice } from '../Editor/QuestionsEditor/client';



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

function QuizPreview() {
    const { assignmentId, courseId, quizId, questionId } = useParams();

    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quiz = quizList.find(
        (quiz) => quiz.course === courseId && quiz._id === quizId
    );

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionsData = await client.findQuestionsForQuiz(quizId);
                setQuestions(questionsData);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [quizId]);

    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const question = questionList.find((question) => question._id === questionId);
    const quizQuestions = useSelector((state: KanbasState) => state.questionsReducer.questions.find((question: any) => question._id === questionId)?.questions);

    const handleNext = () => {
        if (questions && questions.length > 0) {
            const currentQuestionId = questions[currentQuestionIndex]._id;
            const nextQuestion = questions.find(question => question._id > currentQuestionId);
            if (nextQuestion) {
                const nextIndex = questions.indexOf(nextQuestion);
                setCurrentQuestionIndex(nextIndex);
                console.log("next", nextIndex);
                console.log("current", currentQuestionIndex);
            } else {
                console.log('End of Quiz');
            }
        } else {
            console.log("No questions for preview yet");
        }
    };


    const goToQuestion = (index: any) => {
        setCurrentQuestionIndex(index);
    };


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
        shuffleAnswers: Boolean;
        QuizType: String;
        Minutes: Number;
        AccessCode: Number;
        timeLimitCheck: Boolean;
        multipleAttempts: Boolean;
        showCorrectAnswersCheck: Boolean;
        showCorrectAnswers: Date;
        OneQuestionAtATime: Boolean;
        WebCam: Boolean;
        lockQuestionAfterAnswering: Boolean;
        category: String;
    }

    return (
        <div className="mt-5">
            {quiz &&
                <h1 style={{ marginLeft: "20px", marginRight: "20px" }} >
                    {quiz.title}
                </h1>
            }
            <div style={{ marginLeft: "20px", marginRight: "20px", backgroundColor: "#ffdddd", color: "crimson", padding: "10px", borderRadius: "5px" }}>
                <AiOutlineExclamationCircle className="me-2" />This is a preview of the published version of the quiz
            </div>

            <div style={{ marginLeft: "20px", marginRight: "20px" }} className="mt-2">
                Started: {formatDate(new Date())}
            </div>

            <h1 style={{ marginLeft: "20px", marginRight: "20px" }} >
                Quiz Instructions
            </h1>

            <hr style={{ color: "black", marginLeft: "20px", marginRight: "20px" }} />

            <div className="p-4">

                <div className="d-flex" style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <div style={{ marginLeft: "30px", fontSize: "30px", marginTop: "20px" }}>
                        <CgPentagonRight />
                    </div>
                    <div style={{ width: "80%", marginTop: "20px" }}>
                        <div style={{ backgroundColor: "#f9f9f9", border: "solid 1px #ccc", padding: "10px" }} className="d-flex">
                            <div style={{ fontSize: "1.2em", fontWeight: "bold", marginLeft: "20px" }}>Question {currentQuestionIndex + 1}</div>
                            {currentQuestion && questions.filter((question: any) => question._id === currentQuestion._id).map((question: any, index: any) => (
                                <div key={question._id} style={{ fontSize: "1.2em", marginRight: "20px" }} className="flex-fill">
                                    <span className="float-end">{currentQuestion.points} pts</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="d-flex" style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <div style={{ width: "80%", marginLeft: "60px" }}>
                        {questions.filter((question: any) => question._id === currentQuestion._id).map((question: any, index: any) => (
                            <div key={question._id} className="d-grid gap-3 col-sm border border-1 p-4">
                                <div style={{ fontSize: "1.2em", marginLeft: "30px" }}>{question.question}</div>

                                <hr style={{ color: "grey", marginLeft: "20px", marginRight: "20px", marginTop: "10px", marginBottom: "-5px" }} />
                                {question.questionType === 'Multiple Choice' && (
                                    <ul className="list-group">
                                        {question.multipleChoice.map((choice: any) => (
                                            <li className="list-group-item" style={{ border: "transparent" }} key={choice._id}>
                                                <div style={{ marginLeft: "30px" }}>
                                                    <input type="radio" id={`option${choice._id}`} name={`answer${index}`}></input>
                                                    <label htmlFor={`option${choice._id}`} style={{ marginLeft: "10px" }}>{choice.text}</label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {question.questionType === 'True/False' && (
                                    <div>
                                        <div style={{ marginLeft: "40px" }}>
                                            <input type="radio" id={`optionTrue${question._id}`} name={`answer${index}`} value="true"></input>
                                            <label htmlFor={`optionTrue${question._id}`} style={{ marginLeft: "10px" }}>True</label>
                                        </div>
                                        <hr style={{ color: "grey", marginLeft: "20px", marginRight: "20px" }} />
                                        <div style={{ marginLeft: "40px" }}>
                                            <input type="radio" id={`optionFalse${question._id}`} name={`answer${index}`} value="false"></input>
                                            <label htmlFor={`optionFalse${question._id}`} style={{ marginLeft: "10px" }}>False</label>
                                        </div>
                                    </div>
                                )}
                                {question.questionType === 'Fill In the Blank' && question.fillBlank.map((answer: any, ansIndex: any) => (
                                    <li key={ansIndex} className="list-group-item" style={{ border: "transparent" }}>
                                        <div style={{ marginLeft: "20px" }} className="d-flex">
                                            <label id="answer1" style={{ marginLeft: "10px", marginRight: "20px" }}>Answer: </label>
                                            <input
                                                id="answer1" className="form-control mb-2 w-25" />
                                        </div>
                                    </li>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row" style={{ marginTop: "30px", marginLeft: "70px", width: "80%" }}>
                    <div className="col-sm">
                        <button className="btn btn-light float-end" style={{ marginLeft: "70px" }} onClick={handleNext}>Next <GoTriangleRight /></button>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "30px", marginLeft: "70px", width: "80%" }}>
                    <div className="d-grid gap-3 col-sm border">
                        <div className="row p-2" style={{ textAlign: "left" }}>
                            <div className="col-sm">
                                <div className="form-check float-end">
                                    <span style={{ marginRight: "10px" }}>Quiz saved at {formatDate(new Date())} </span>
                                    <button className="btn btn-light float-end">
                                        Submit Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: "80%", marginTop: "20px", marginLeft: "70px" }} className="mt-5">
                    <div style={{ backgroundColor: "#f9f9f9", border: "solid 1px #ccc", padding: "10px" }} className="d-flex">
                        <div style={{ fontSize: "1.2em", marginLeft: "20px" }}>
                            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`} style={{textDecoration: "none", color:"black"}}><PiPencil /> Keep Editing This Quiz</Link>
                            </div>
                    </div>
                </div>

                <div style={{ marginLeft: "70px", marginRight: "20px" }} className="mt-5">
                    <h4>Questions</h4>
                    <ul className="list-group">
                        {questions.map((question, index) => (
                            <li key={question._id} className="list-group-item" style={{ border: "transparent" }}>
                                <CiCircleQuestion /><Link to="#" onClick={() => goToQuestion(index)} style={{ textDecoration: "none", color: "crimson" }} className="ms-2">Question {index + 1}</Link>
                            </li>
                        ))}
                    </ul>
                </div>



            </div>
        </div>
    );
}
export default QuizPreview;