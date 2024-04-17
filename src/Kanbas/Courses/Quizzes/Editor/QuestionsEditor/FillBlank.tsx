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
import { GoTrash } from "react-icons/go";

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

function QuizFillBlankEditor({onCancel} : any) {
    const { assignmentId, courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
          .then((quizzes) =>
            dispatch(selectQuiz(quizzes))
        );
      }, [courseId]);      
    // const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
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

    const [quizQuestion, setQuizQuestion] = useState('');
    const handleQuestionChange = (value : any) => {
        setQuizQuestion(value);
        // dispatch(updateAssignment({...assignment, description: value}));
    };

    const [answers, setAnswers] = useState([{id: 1, text:''}]);
    const handleAddAnswer = () => {
        const newId = answers.length > 0 ? answers[answers.length - 1].id + 1 : 1;
        setAnswers([...answers, {id: newId, text: ''}])
    };
    const handleRemoveAnswer = (id : any) => {
        setAnswers(answers.filter(answer => answer.id !== id));
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
        
    };

    return(
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
                            className="form-label mt-2" style={{fontWeight:"bold"}}>
                            Question:</label>
                            <ReactQuill 
                                theme="snow"
                                value={quizQuestion}
                                onChange={handleQuestionChange}
                            />
                </div>
                <div>
                    <label htmlFor="Answers"
                            className="form-label mt-2" style={{fontWeight:"bold"}}>
                            Answers:</label>
                </div>

                {answers.map((answer, index) => (
                    <div className="row g-3" style={{marginLeft:"20px", marginRight:"20px", marginTop:"5px" }}> 
                                <div className="col-md-6" style={{width:"200px"}}>
                                    <label style={{marginLeft: '5px'}}>
                                        Possible Answer:
                                    </label>    
                                </div>
                                <div className="col-md-6" style={{width:"300px", marginLeft:"-60px"}}>
                                    <textarea
                                        className="form-control" 
                                        style={{height:"30px"}}
                                    />  
                                </div>    
                                <div className="col-md-6">
                                    <button className="ms-2" onClick={() => handleRemoveAnswer} style={{border:"none", backgroundColor:"white"}}><GoTrash/></button>
                                </div>
                                
                    </div>
                ))}

                <button className="ms-2 mt-2 float-end" onClick={handleAddAnswer} style={{backgroundColor:"white", border:"none", color:"crimson"}}>+ Add Another Answer</button>


                <div className="col-md-6 text-align:left mt-5">
                        <button 
                            className="btn btn-light"
                            onClick={(e) => {
                                e.preventDefault(); 
                                onCancel(); 
                            }}>
                            Cancel
                        </button>
                        <button onClick={handleSave}  className="btn btn-danger ms-2">
                        Update Question
                        </button>
                </div>    

            </form>
        </div>
    );
}
export default QuizFillBlankEditor;