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
import { CiSearch } from "react-icons/ci";

import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
  } from "../../../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../../../Courses/Assignments/client";  
import { findAssignmentsForCourse, createAssignment } from "../../../../Courses/Assignments/client";
import QuizMultipleChoiceEditor from './MultipleChoice';
import QuizTrueFalseEditor from './TrueFalse';
import QuizFillBlankEditor from './FillBlank';

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes,
} from "../../reducer"

import * as client from "../../client";  
import { findQuizzesForCourse, createQuiz } from "../../client";


interface Question {
    id: number;
    type: string;
}

function QuizQuestionsDetailEditor() {
    const { assignmentId, courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
          .then((quizzes) =>
            dispatch(selectQuiz(quizzes))
        );
      }, [courseId]);   
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    // const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const quiz = quizList.find(
        (quiz) => quiz.course === courseId && quiz._id === quizId 
    );
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

    const [quizInstructions, setQuizInstructions] = useState('');

    const handleInstructionsChange = (value : any) => {
        setQuizInstructions(value);
        dispatch(updateQuiz({...quiz, description: value}));
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
    

    const [title, setTitle] = useState('');
    const handleTitleChange = (e : any) => setTitle(e.target.value);

    const [points, setPoints] = useState(1);
    const handlePointsChange = (e : any) => setPoints(Number(e.target.value) || 0);

    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionType, setQuestionType] = useState('multipleChoice');
    const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);

    const handleQuestionTypeChange = (event : any) => {
        setQuestionType(event.target.value);
    };

    const handleAddQuestionClick = () => {
        const newId = Date.now();
        // const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        setQuestions([
            ...questions,
            {id: newId, type: 'multipleChoice'}
        ]);
        setCurrentQuestionId(newId);
        setShowQuestionForm(true); 
    };

    const handleCancel = () => {
        setShowQuestionForm(false);
        if (questions.length === 1 && questions[0].id === currentQuestionId) {
            setQuestions([]);  
        } else {
            setQuestions(questions.filter(question => question.id !== currentQuestionId));
            setCurrentQuestionId(null);
        }
    };
    

    return(
        <div>
                
                    {questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div className="row g-3 mt-2" style={{marginLeft:"20px", marginRight:"20px"}}>
                                    <div className="col-md-6" style={{width:"200px"}} key={question.id}>
                                        <input 
                                        value="Question Title"
                                        onChange={handleTitleChange}
                                        className="form-control mb-2" />
                                    </div>
                                    <div className="col-md-6" style={{width:"300px"}}>
                                        <select
                                            id="questionTypeSelect"
                                            className="form-select"
                                            value={questionType}
                                            onChange={handleQuestionTypeChange}
                                        >
                                            <option value="multipleChoice">Multiple Choice</option>
                                            <option value="trueFalse">True/False</option>
                                            <option value="fillInBlank">Fill In the Blank</option>
                                        </select>   
                                    </div>  
                                    {questionType === 'multipleChoice' && (
                                            <QuizMultipleChoiceEditor onCancel={handleCancel}/>
                                        )}
                                        {questionType === 'trueFalse' && (
                                            <QuizTrueFalseEditor onCancel={handleCancel}/>
                                        )}
                                        {questionType === 'fillInBlank' && (
                                            <QuizFillBlankEditor onCancel={handleCancel}/>
                                        )}
                                    <div className="col-md-6 text-align:left flex-fill" >
                                        <input type="number" 
                                            className="form-control float-end me-2"
                                            style={{width:"70px"}} 
                                            id="pts"
                                            value={points}
                                            onChange={handlePointsChange}
                                        />
                                        <label className="float-end mt-2 me-2">pts:</label>
                                    </div>   
                                
                            </div>
                        );
                    })}
                 

                <hr style={{color:"black", marginLeft:"20px", marginRight:"20px"}} />
            
                <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-light ms-3" onClick={handleAddQuestionClick}>
                            + New Question
                            </button>
                            <Link to={"#"} className="btn btn-light ms-4">
                                + New Question Group
                            </Link>
                            <Link to={"#"}
                                className="btn btn-light ms-4">
                                <CiSearch className="me-2"/>Find Questions
                            </Link>
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
                
        </div>
    );
}
export default QuizQuestionsDetailEditor;