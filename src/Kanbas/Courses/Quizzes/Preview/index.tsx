import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate} from "react-router-dom";
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../../store';
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

import * as client from "../client";  
import { findQuizzesForCourse, createQuiz } from "../client";

function QuizPreview() {
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

    return(
        <div>
            <h1 style={{marginLeft:"20px", marginRight:"20px"}} >
                {quiz.title}
            </h1>
            <h1 style={{marginLeft:"20px", marginRight:"20px"}} >
                Quiz Instructions
            </h1>
            <hr style={{color:"black", marginLeft:"20px", marginRight:"20px"}} />
            
                
        </div>
    );
}
export default QuizPreview;