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
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
} from "../../../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../../../Courses/Assignments/client";  
import { findAssignmentsForCourse, createAssignment } from "../../../../Courses/Assignments/client";
import React, { useState } from 'react';
import * as client from "./client";

function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function QuizMultipleChoiceEditor({ question, setQuestions, onCancel }: any) {
    const [quizQuestion, setQuizQuestion] = useState(question.question);
    const [choices, setChoices] = useState(question.multipleChoice || []);
    const [originalQuestion] = useState(question.question);

    const handleCancel = () => {
        setQuizQuestion(originalQuestion);
        onCancel();
    };
    const handleQuestionChange = (value: string) => {
        setQuizQuestion(value);
    };

    const handleChoiceTextChange = (id: any, text: string) => {
        setChoices(choices.map((choice: any) => (choice._id === id ? { ...choice, text: text } : choice)));
    };

    const handleCorrectChoiceChange = (id: any) => {
        console.log("id", id);
        console.log("Hello");
        setChoices(choices.map((choice: any) => {
            if (choice._id === id) {
                return {
                    ...choice,
                    isCorrect: true
                };
            } else {
                return {
                    ...choice,
                    isCorrect: false
                };
            }
        }));
    };

    const handleAddChoice = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        let newId;
        console.log("triggered");
        if(choices && choices.length > 0) {
            console.log("choice id", choices[choices.length-1]._id);
            const numericalPart = parseInt(choices[choices.length-1]._id.replace("Multi", ""));
            console.log(numericalPart);
            newId = "Multi" + (numericalPart+1).toString();
            console.log((numericalPart+1).toString());
        } else {
            newId = "Multi1";
        }
        setChoices([...choices, { _id: newId, text: '', isCorrect: false }]);
    };

    const handleRemoveChoice = (id: any, e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setChoices(choices.filter((choice: any) => choice._id !== id));
    };

    const handleSave = async (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedQuestion = {
            ...question,
            question: quizQuestion,
            multipleChoice: choices
        };
        try {
            await client.updateQuestion(updatedQuestion);
            setQuestions((updatedQuestions: any) => updatedQuestions.map((q: any) => q._id === updatedQuestion._id ? updatedQuestion : q));
        } catch (error) {
            console.error("Error updating question:", error);
            // Handle error appropriately, e.g., show an error message to the user
        }
    };

    const handleDelete = async (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await client.deleteQuestion(question._id);
            const questionsData = await client.findQuestionsForQuiz(question.quizId);
            setQuestions(questionsData);
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="flex-fill">
            <form>
                <div className="col-12">
                    <label>Enter your question and multiple answers, then select the one correct answer.</label>
                </div>
                <div className="col-12">
                    <label
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Question:</label>
                    <ReactQuill
                        theme="snow"
                        value={quizQuestion}
                        onChange={handleQuestionChange}
                    />
                </div>
                <div>
                    <label
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Answers:</label>
                </div>

                {choices.map((choice: any) => (
                    <div key={choice._id} className="row g-3" style={{ marginLeft: "20px", marginRight: "20px", marginTop: "5px" }}>
                        <div className="col-md-6" style={{ width: "200px" }}>
                            <label htmlFor={`choice-${choice._id}`} style={{ marginLeft: '5px' }}>
                                Correct Answer
                            </label>
                        </div>
                        <div className="col-md-6" style={{ width: "30px", marginLeft: "-80px" }}>
                            <input
                                type="radio"
                                id={choice._id}
                                name="correctChoice"
                                className="me-2"
                                checked={choice.isCorrect}
                                onClick={() => handleCorrectChoiceChange(choice._id)}
                            />
                        </div>
                        <div className="col-md-6" style={{ width: "300px" }}>
                            <textarea
                                className="form-control"
                                style={{ height: "30px" }}
                                value={choice.text}
                                onChange={(e) => handleChoiceTextChange(choice._id, e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <button className="ms-2" onClick={(e) => handleRemoveChoice(choice._id, e)} style={{ border: "none", backgroundColor: "white" }}><GoTrash /></button>
                        </div>

                    </div>
                ))}


                <button className="ms-2 mt-2 float-end" onClick={handleAddChoice} style={{ backgroundColor: "white", border: "none", color: "crimson" }}>+ Add Another Answer</button>


                <div className="col-md-6 text-align:left mt-5">
                    <button
                        className="btn btn-light"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // handleCancel();
                            console.log("nothing needs to be changed");
                        }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-danger ms-2">
                        Update Question
                    </button>
                    <button className="ms-2" 
                    style={{ border: "none", backgroundColor: "white" }}
                    onClick = {(e) => {
                        handleDelete(e);
                    }}
                    >
                        <GoTrash />
                        </button>

                </div>

            </form>


        </div>
    );
}
export default QuizMultipleChoiceEditor;