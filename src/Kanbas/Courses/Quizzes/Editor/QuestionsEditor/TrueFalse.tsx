import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../../../store';
import { Modal, Button } from 'react-bootstrap';
import { RxRocket } from "react-icons/rx";
import { RiProhibitedLine } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CiSearch } from "react-icons/ci";

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

import * as client from "./client";
import { findQuizzesForCourse, createQuiz } from "../../client";

function QuizTrueFalseEditor({ question, setQuestions, onCancel }: any) {
    const [quizQuestion, setQuizQuestion] = useState(question.question);
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(question.trueFalse[0].isTrue !== undefined ? question.trueFalse[0].isTrue : null);
    const [originalQuestion] = useState(question.question);

    const handleCancel = () => {
        setQuizQuestion(originalQuestion);
        onCancel();
    };
    console.log("correct", correctAnswer);
    const handleQuestionChange = (value: string) => {
        setQuizQuestion(value);
    };

    const handleCorrectAnswerChange = (value: boolean) => {
        setCorrectAnswer(value);
    };

    const handleSave = async () => {
        const updatedQuestion = {
            ...question,
            question: quizQuestion,
            trueFalse: {
                _id: question.trueFalse[0]._id,
                isTrue: correctAnswer !== undefined ? correctAnswer : false
            }
        };
        try {
            await client.updateQuestion(updatedQuestion);
            setQuestions((updatedQuestions: any) => updatedQuestions.map((q:any) => q._id === updatedQuestion._id ? updatedQuestion : q));
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };
    return (
        <div>
            <form>
                <div className="col-12">
                    <label>Enter your question text then select if True or False is the correct answer</label>
                </div>
                <div className="col-12">
                    <label htmlFor="Quiz Question"
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Question:</label>
                    <ReactQuill
                        theme="snow"
                        value={quizQuestion}
                        onChange={handleQuestionChange}/>
                </div>
                <div>
                    <label htmlFor="Answers"
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Answers:</label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="correctAnswer"
                        id="trueOption"
                        value="true"
                        checked={correctAnswer === true}
                        onChange={() => handleCorrectAnswerChange(true)}
                    />
                    <label className="form-check-label" htmlFor="trueOption">True</label>
                </div>

                <div className="form-check mt-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="correctAnswer"
                        id="falseOption"
                        value="false"
                        checked={correctAnswer === false}
                        onChange={() => handleCorrectAnswerChange(false)}
                    />
                    <label className="form-check-label" htmlFor="falseOption">False</label>
                </div>

                <div className="col-md-6 text-align:left mt-5">
                    <button
                        className="btn btn-light"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCancel();
                        }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-danger ms-2">
                        Update Question
                    </button>
                </div>
            </form>

        </div>
    );
}
export default QuizTrueFalseEditor;