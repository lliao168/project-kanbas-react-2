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
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../../reducer"

import * as client from "../../client";  
import { findQuizzesForCourse, createQuiz } from "../../client";



function QuizDetailsEditor() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);

    const quiz = quizList.find(
        (quiz) => quiz.course === courseId && quiz._id === quizId 
    );

    const formattedDate = (isoDateStr : any) => {
        if (!isoDateStr) return '';
        const date = new Date(isoDateStr);
        return date.toISOString().split('T')[0]; 
    };

    const [quizType, updateType] = useState(quiz ? quiz.QuizType : '');
    const [quizTitle, updateTitle] = useState(quiz ? quiz.title : '');
    const [quizInstructions, setQuizInstructions] = useState(quiz ? quiz.description : '');
    const [quizPoint, updatePoint] = useState(quiz ? quiz.points : '');
    const [quizCategory, updateCategory] = useState(quiz ? quiz.category : '');
    const [quizShuffle, updateShuffle] = useState(quiz ? quiz.shuffleAnswers : true);
    const [checkTimeLimit, updateTimeLimitCheck] = useState(quiz ? quiz.timeLimitCheck : true);
    const [quizTimeLimit, updateTimeLimit] = useState(quiz ? quiz.Minutes : '20');
    const [quizMultipleAttempts, updateMultipleAttemples] = useState(quiz ? quiz.multipleAttempts : false);
    const [quizCheckShowAns, updateChecksShowAns] = useState(quiz ? quiz.showCorrectAnswersCheck : false);
    const [quizCorrectAnswer, updateShowCorrectAnswer] = useState(quiz ? formattedDate(quiz.showCorrectAnswers)  : '');
    const [quizSingleQues, updateSignQues] = useState(quiz ? quiz.OneQuestionAtATime : true);
    const [quizWebCam, updateWebCam] = useState(quiz ? quiz.WebCam : false);
    const [lockQues, updateLockQues] = useState(quiz ? quiz.lockQuestionAfterAnswering : false);
    const [quizDueDate, updateDueDate] = useState(quiz ? formattedDate(quiz.dueDate) : '');
    const [quizAvailableFromDate, updateAvailableFromDate] = useState(quiz ? formattedDate(quiz.availableFromDate) : '');
    const [quizUntilDate, updateUntilDate] = useState(quiz ? formattedDate(quiz.availableUntilDate) : '');
    const [quizPublish, updatePublish] = useState(quiz ? quiz.isPublished : false);
    const [quizAccessCode, updateAccessCode] = useState(quiz ? quiz.AccessCode  : '');

    const handleTitleChange = (value: string) => {
        updateTitle(value);
        dispatch(updateQuiz({ ...quiz, title: value }));
    };
    const handleInstructionsChange = (value: string) => {
        setQuizInstructions(value);
        dispatch(updateQuiz({ ...quiz, description: value }));
    };
    const handleQuizTypeChange = (value: string) => {
        updateType(value);
        dispatch(updateQuiz({ ...quiz, QuizType: value }));
    }
    const handlePointChange = (value: number) => {
        updatePoint(value);
        dispatch(updateQuiz({ ...quiz, points: value }));
    }
    const handleQuizCategory = (value: string) => {
        updateCategory(value);
        dispatch(updateQuiz({ ...quiz, category: value }))
    }
    const handleShuffle = (e: any) => {
        const isChecked = e.target.checked;
        updateShuffle(isChecked);
        dispatch(updateQuiz({ ...quiz, shuffleAnswers: isChecked }));
    }
    const handleTimeLimitCheck = (e: any) => {
        const isChecked = e.target.checked;
        updateTimeLimitCheck(isChecked);
        dispatch(updateQuiz({ ...quiz, timeLimitCheck: isChecked }));
    }
    const handleTimeLimit = (value: number) => {
        updateTimeLimit(value);
        dispatch(updateQuiz({ ...quiz, Minutes: value }));
    }
    const handleMultiAttemps = (e: any) => {
        const isChecked = e.target.checked;
        updateMultipleAttemples(isChecked);
        dispatch(updateQuiz({ ...quiz, multipleAttempts: isChecked }));
    }
    const handleUpdateCheckShowAns = (e: any) => {
        const isChecked = e.target.checked;
        updateChecksShowAns(isChecked);
        dispatch(updateQuiz({ ...quiz, showCorrectAnswersCheck: isChecked }));
    }

    const handleUpdateShowAns = (value : any) => {
        updateShowCorrectAnswer(value);
        dispatch(updateQuiz({ ...quiz, showCorrectAnswers: new Date(value).toISOString() }));
    }

    const handleUpdateAccessCode = (value : any) => {
        updateAccessCode(value);
        dispatch(updateQuiz({ ...quiz, AccessCode: value }));
    }

    const handleSingleQues = (e: any) => {
        const isChecked = e.target.checked;
        updateSignQues(isChecked);
        dispatch(updateQuiz({ ...quiz, OneQuestionAtATime: isChecked }));
    }
    const handleWebCam = (e: any) => {
        const isChecked = e.target.checked;
        updateWebCam(isChecked);
        dispatch(updateQuiz({ ...quiz, WebCam: isChecked }));
    }
    const handleLockQues = (e: any) => {
        const isChecked = e.target.checked;
        updateLockQues(isChecked);
        dispatch(updateQuiz({ ...quiz, lockQuestionAfterAnswering: isChecked }));
    }

    const handleDueDate = (value: string) => {
        updateDueDate(value);
        dispatch(updateQuiz({ ...quiz, dueDate: new Date(value).toISOString() }));
    }
    const handleAvailableFromDate = (value: string) => {
        updateAvailableFromDate(value);
        dispatch(updateQuiz({...quiz, availableFromDate: new Date(value).toISOString()}));
    }
    const handAvailableUntilDate = (value: string) => {
        updateUntilDate(value);
        dispatch(updateQuiz({...quiz, availableUntilDate: new Date(value).toISOString()}));
    }

    const handleAddQuiz = () => {
        const newQuizDetails = {
            ...quiz,
            course: courseId
        };
        if (courseId) {
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
        // if (!quiz.dueDate || !quiz.availableFromDate || !quiz.availableUntilDate) {
        //     alert("All date fields ('Due to', 'Available from', and 'Until') are required to save this Quiz.");
        //     return;
        // }
        if (quiz?._id) {
                if (quizId && quizId !== 'new') {
                    handleUpdateQuiz();
                } else {
                    handleAddQuiz();
                }
                {quiz &&
                    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`)
                }
        }
    }

    const handleSaveAndPublish = () => {
        if (!quiz) {
            console.error('Quiz details are undefined');
            return; 
        }
    
        const updatedQuiz = {
            ...quiz,
            isPublished: quiz.isPublished ? quiz.isPublished : true
        };
       
        client.updateQuiz(updatedQuiz).then(() => { 
        dispatch(updateQuiz(updatedQuiz)); })
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)
    }

    useEffect(() => {
        findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(selectQuiz(quizzes))
            );
    }, [courseId]);

    return (
        <div className="flex-fill p-4">
            <form>
                <div className="col-12" style={{ width: "500px" }}>
                    <input
                        className="form-control mb-2" value={quizTitle}
                        onChange={(e) => handleTitleChange(e.target.value)} />
                </div>
                <div className="row g-3 justify-content-center">

                    <div className="col-12">
                        <label
                            className="form-label mt-2">
                            Quiz Instructions:</label>
                        <ReactQuill
                            theme="snow"
                            value={quizInstructions}
                            onChange={handleInstructionsChange}
                        />
                    </div>
                </div>

                <div className="d-grid gap-3 container text-sm-end justify-content-center mt-3">
                    <div className="row" >
                        <label htmlFor="quiz-type" className="col-sm-2  
                                            col-form-label col-form-label-sm">Quiz Type</label>
                        <div className="col-sm">
                            <select className="form-select" id="quiz-type" value={quizType} onChange={(e) => handleQuizTypeChange(e.target.value)}>
                                <option value="Graded Quiz" >Graded Quiz</option>
                                <option value="Practice Quiz" >Practice Quiz</option>
                                <option value="Graded Survey" >Graded Survey</option>
                                <option value="Ungraded Survey" >Ungraded Survey</option>
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
                                value={quizPoint}
                                onChange={(e) => handlePointChange(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="row" >
                        <label htmlFor="Quiz-group" className="col-sm-2  
                                            col-form-label col-form-label-sm">Assignment Group</label>
                        <div className="col-sm">
                            <select id="Quiz-group" className="form-select" value={quizCategory}
                                 onChange={(e) => handleQuizCategory(e.target.value)}>
                                <option value="QUIZZES" >QUIZZES</option>
                                <option value="ASSIGNMENTS" >ASSIGNMENTS</option>
                                <option value="EXAM" >EXAM</option>
                                <option value="PROJECT">PROJECT</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <label style={{ fontWeight: "bold" }}>
                                Options
                            </label>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    id="shuffleAnswer"
                                    checked={quizShuffle}
                                    onChange={handleShuffle} />
                                <label className="form-check-label" htmlFor="shuffleAnswer">
                                    Shuffle Answers
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check d-flex">
                                <input className="form-check-input me-2"
                                    type="checkbox"
                                    id="timeLimitCheck"
                                    checked={checkTimeLimit}
                                    onChange={handleTimeLimitCheck} />
                                <label className="form-check-label" htmlFor="timeLimitCheck" style={{ marginRight: "50px" }}>
                                    Time Limit
                                </label>
                                <input type="number"
                                    // disabled={!checkTimeLimit}
                                    value={quizTimeLimit}
                                    className="form-control float-end me-2"
                                    onChange={(e) => handleTimeLimit(Number(e.target.value))}
                                    style={{ width: "70px" }}
                                    id="minutes"
                                />
                                <label className="float-end mt-2">Minutes</label>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="d-grid gap-3 col-sm border border-1 rounded">
                            <div className="row p-2" style={{ textAlign: "left" }}>
                                <label ></label>
                                <div className="col-sm">
                                    <div className="form-check float-start">
                                        <input className="form-check-input" 
                                        type="checkbox" 
                                        id="multipleAttempts"
                                        checked= {quizMultipleAttempts}
                                        onChange={handleMultiAttemps} />
                                        <label className="form-check-label" htmlFor="multipleAttempts">
                                            Allow Multiple Attempts
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check d-flex">
                                <input className="form-check-input me-2" 
                                type="checkbox" 
                                id="showCorrectAnswers" 
                                checked= {quizCheckShowAns}
                                onChange={handleUpdateCheckShowAns}/>
                                <label className="form-check-label" htmlFor="showCorrectAnswers" style={{ marginRight: "50px" }}>
                                    Show Correct Answers
                                </label>
                                <input type="date"
                                    className="form-control float-end me-2"
                                    style={{ width: "50%" }}
                                    id="Show Answers Date"
                                    value={quizCorrectAnswer}
                                    onChange={(e) =>
                                        handleUpdateShowAns(e.target.value)}

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
                                value={quizAccessCode}
                                onChange={(e) =>
                                    handleUpdateAccessCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="checkbox" 
                                id="singleQues"
                                checked={quizSingleQues} 
                                onChange={handleSingleQues} />
                                <label className="form-check-label" htmlFor="singleQues">
                                    One Question at a Time
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="checkbox" 
                                id="webCam" 
                                checked = {quizWebCam}
                                onChange={handleWebCam} />
                                <label className="form-check-label" htmlFor="webCam">
                                    Webcam Required
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ textAlign: "left" }}>
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm"></label>
                        <div className="col-sm">
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="checkbox" 
                                id="lockQues"
                                checked={lockQues}
                                onChange={handleLockQues} />
                                <label className="form-check-label" htmlFor="lockQues">
                                    Lock Questions After Answering
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-sm-2  
                                            col-form-label col-form-label-sm">Assign</label>

                        <div className="d-grid gap-3 col-sm border border-1 rounded">

                            <div className="row g-3">
                                <div className="col-12" style={{ textAlign: "left" }}>
                                    <label
                                        className="form-label mt-3"><b>
                                            Assign to</b></label>
                                    <div className="d-grid gap-3 col-sm border border-1 rounded">
                                        <div>
                                            <button type="button" className="btn btn-light float end m-2">
                                                Everyone<FaXmark className="ms-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12" style={{ textAlign: "left" }}>
                                    <label htmlFor="due-date"
                                        className="form-label"><b>
                                            Due</b></label>
                                    <input type="date"
                                        className="form-control"
                                        id="due-date"
                                        placeholder=""
                                        value={quizDueDate}
                                        onChange={(e) => handleDueDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="available-from" className="form-label"><b>Available from</b></label>
                                    <input type="date" 
                                    className="form-control mb-4" 
                                    id="available-from" 
                                    value={quizAvailableFromDate}
                                        onChange={(e) => handleAvailableFromDate(e.target.value)
                                         } />
                                </div>

                                <div className="col-md-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="until" className="form-label"><b>Until</b></label>
                                    <input type="date" className="form-control mb-4" id="until" value={quizUntilDate}
                                        onChange={(e) =>
                                            handAvailableUntilDate(e.target.value) } />
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
            </form>
            <hr style={{ color: "grey", marginLeft: "20px", marginRight: "20px" }} />

            <form>
                <div className="row g-3" style={{ marginLeft: "20px", marginRight: "20px" }}>
                    <div className="col-md-6 text-align:left">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                            <label className="form-check-label" htmlFor="gridCheck">
                                Notify users that this quiz has changed
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6 text-align:left">
                        <button className="btn btn-danger ms-2 float-end" onClick={handleSave}>
                            Save
                        </button>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`} className="btn btn-light float-end ms-2" onClick={handleSaveAndPublish}>
                            Save & Publish
                        </Link>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            onClick={() => { navigate(`/Kanbas/Courses/${courseId}/Quizzes`) }} className="btn btn-light float-end">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>

        </div>
    );
}
export default QuizDetailsEditor;