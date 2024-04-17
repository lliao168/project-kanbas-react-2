import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from "react-router-dom";
import { assignments } from "../../../Database";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import { PiPencil } from "react-icons/pi";
import { FaArrowRightFromBracket, FaBan, FaChartSimple, FaCircle, FaCircleCheck, FaFileImport, FaXmark } from "react-icons/fa6";
import { RiProhibitedLine } from "react-icons/ri";

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

   

    const handleEditClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Editor`);
    };

    const handlePreviewClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`);
    }


    const handlePublish = (quizId : Quiz | null, e : any) => {
        e.preventDefault(); 
        if (!quizId) return;
        const quiz = quizList.find(q => q._id === quizId);
        if (quiz) {
            const updatedQuiz = {...quiz, isPublished: !quiz.isPublished};
            client.updateQuiz(updatedQuiz).then(() => {  
                dispatch(updateQuiz(updatedQuiz));
            })
        }
    };



return  (
    <div>
        {quiz && (
            <h1>
                {quiz.title}
            </h1>
        )}    

        {quiz && (
                <button type="button" onClick={handleEditClick} className="btn btn-light float-end m-2">
                    <PiPencil /> Edit
                </button>
        )}

        {quiz && (
            <button type="button" onClick={handlePreviewClick} className="btn btn-light float-end m-2">
                    Preview
            </button>
        )}

        {quiz && quiz.isPublished ? (
                <button className="btn btn-success float-end m-2" onClick={(e) => handlePublish(quiz._id, e)}>
                <FaCircleCheck style={{color:"white"}} /> Published</button>
                                    ) : (
                <button className="btn btn-light float-end m-2" onClick={(e) => handlePublish(quiz._id, e)} >
                <RiProhibitedLine className="text-muted me-1" />
                Unpublish</button>)}      

        {quiz && (
            <h2>{quiz.description}</h2>
        )}

        {quiz && (
            <label className="form-check-label" htmlFor="shuffleCheck">
                                {quiz.shuffleAnswer ? 'Yes' : 'No'}
                            </label>
        )}
                            <br/>
        {quiz && (                    
            <label>{quiz.dueDate}</label>   
        )}         

        
    </div>

);

}
export default QuizDetailsScreen;