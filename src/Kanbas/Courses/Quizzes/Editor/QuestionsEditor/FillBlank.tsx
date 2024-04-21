import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GoTrash } from "react-icons/go";
import * as client from "./client";

function QuizFillBlankEditor({ originalQuestions, question, setQuestions, onCancel }: any) {
    const [quizQuestion, setQuizQuestion] = useState(question.question);

    const handleQuestionChange = (value: any) => {
        setQuizQuestion(value);
    };
    const [originalQuestion] = useState(question.question);

    const handleCancel = () => {
        setQuizQuestion(originalQuestion);
        onCancel();
    };

    const [answers, setAnswers] = useState(question.fillBlank || []);

    const handleAddAnswer = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        let newId;
        console.log("length", answers.length);
        if (answers && answers.length > 0) {
            const numericalPart = parseInt(answers[answers.length - 1]._id.replace("Fill", ""));
            newId = "Fill" + (numericalPart + 1).toString();
        } else {
            newId = "Fill1";
        }
        console.log([...answers, { _id: newId, correctAnswers: '', caseInsensitive: false }]);
        setAnswers([...answers, { _id: newId, correctAnswers: '', caseInsensitive: false }]);
    };

    const handleRemoveAnswer = (id: any, e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setAnswers(answers.filter((answer: any) => answer._id !== id));
    };
    const handleAnswerTextChange = (id: any, text: any) => {
        setAnswers(answers.map((answer: any) => {
            if (answer._id === id) {
                return { ...answer, correctAnswers: text };
            }
            return answer;
        }));
    };


    const handleSave = async (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedQuestion = {
            ...question,
            question: quizQuestion,
            fillBlank: answers
        };
        try {
            await client.updateQuestion(updatedQuestion);
            setQuestions((updatedQuestions: any) => updatedQuestions.map((q: any) => q._id === updatedQuestion._id ? updatedQuestion : q));
        } catch (error) {
            console.log("update failed");
            console.error("Error updating question:", error);

        }
    };

    const handleDelete = async (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await client.deleteQuestion(question._id);
            const questionsData = await client.findQuestionsForQuiz(question.quizId);
            setQuestions(questionsData);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form>
                <div className="col-12">
                    <div>
                        <label>Enter your question text, then define all possible correct answers for the blank.</label>
                    </div>
                    <div>
                        <label>Students will see the question followed by a small text box to type their answer</label>
                    </div>

                </div>
                <div className="col-12">
                    <label htmlFor="Quiz Question"
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Question:</label>
                    <ReactQuill
                        theme="snow"
                        value={quizQuestion}
                        onChange={handleQuestionChange}
                    />
                </div>
                <div>
                    <label htmlFor="Answers"
                        className="form-label mt-2" style={{ fontWeight: "bold" }}>
                        Answers:</label>
                </div>

                {answers.map((answer: any) => (
                    <div key={answer._id} className="row g-3" style={{ marginLeft: "20px", marginRight: "20px", marginTop: "5px" }}>
                        <div className="col-md-6" style={{ width: "200px" }}>
                            <label style={{ marginLeft: '5px' }}>
                                Possible Answer:
                            </label>
                        </div>
                        <div className="col-md-6" style={{ width: "300px", marginLeft: "-60px" }}>
                            <textarea
                                className="form-control"
                                style={{ height: "30px" }}
                                value={answer.correctAnswers}
                                onChange={(e) => handleAnswerTextChange(answer._id, e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <button className="ms-2" onClick={(e) => handleRemoveAnswer(answer._id, e)} style={{ border: "none", backgroundColor: "white" }}><GoTrash /></button>
                        </div>

                    </div>
                ))}

                <button className="ms-2 mt-2 float-end" onClick={handleAddAnswer} style={{ backgroundColor: "white", border: "none", color: "crimson" }}>+ Add Another Answer</button>


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
                    <button className="ms-2"
                        style={{ border: "none", backgroundColor: "white" }}
                        onClick={(e) => {
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
export default QuizFillBlankEditor;