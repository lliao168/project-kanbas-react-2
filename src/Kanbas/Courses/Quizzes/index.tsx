import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate} from "react-router-dom";
import { assignments } from '../../Database';
import { FaCaretDown, FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from '../../store';
import { Modal, Button} from 'react-bootstrap';
import { RxRocket } from "react-icons/rx";
import { RiProhibitedLine } from "react-icons/ri";
import {deleteAllQuestions} from "../Quizzes/Editor/QuestionsEditor/client";
import {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
  } from "../../Courses/Assignments/assignmentsReducer";

// import * as client from "../../Courses/Assignments/client";  

import { findAssignmentsForCourse, createAssignment } from "../../Courses/Assignments/client";

import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    selectQuiz,
    setQuizzes
} from "../Quizzes/reducer"

import * as client from "../Quizzes/client";

import { findQuizzesForCourse, createQuiz } from '../Quizzes/client';


function determineQuizAvailability(availableFrom : any, availableUntil : any) {
    const currentDate = new Date();
    const availableFromDate = new Date(availableFrom);
    const availableUntilDate = new Date(availableUntil);

    if (currentDate < availableFromDate) {
        return `Not available until ${availableFromDate.toLocaleDateString()}`;
    } else if (currentDate >= availableFromDate && currentDate <= availableUntilDate) {
        return "Available";
    } else {
        return "Closed";
    }
}

function formatDate(dateString : any) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
}

function Quizzes ({profile} : any) {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        findQuizzesForCourse(courseId)
          .then((quizzes) =>
            dispatch(setQuizzes(quizzes))
        );
      }, [courseId]);   
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
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

    const createDefaultQuiz = () => {
        return {
            _id: new Date(),
            title: "New Quiz " + new Date(),
            course: courseId,  
            description: "New Quiz Description",
            points: '',
            dueDate: new Date(),
            availableFromDate: new Date(),
            availableUntilDate: new Date(),
            isPublished: false,
            pts: '',
            Questions: '',
            shuffleAnswers: true,
            QuizType: "Graded Quiz",
            Minutes: 20,
            AccessCode: '',
            timeLimitCheck: true,
            multipleAttempts: false,
            showCorrectAnswersCheck: false,
            showCorrectAnswers: '',
            OneQuestionAtATime: true,
            WebCam: false,
            lockQuestionAfterAnswering: false,
            category: "QUIZZES",
        };
    };

    const handleCreateQuiz = async (e : any) => {
        if (!courseId) {
            console.error("Course ID is undefined.");
            return;
        }
        e.preventDefault();
        const newQuiz = createDefaultQuiz();
        try {
            const createdQuiz = await client.createQuiz(courseId, newQuiz);
            dispatch(addQuiz(createdQuiz));
            dispatch(selectQuiz(createdQuiz));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${createdQuiz._id}`);
        } catch (e) {
            console.log("error creating quiz: ", e);
        }
        
        
    };
    
    const handleSelectQuiz = (quiz: Quiz) => {
        dispatch(selectQuiz(quiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    };

    interface ContextMenuElement {
        x: number;
        y: number;
        onEdit: () => void;
        onDelete: () => void;
        onPublish: () => void;
        onCopy: () => void;
        onSort: () => void;
    }

    // const [contextMenu, setContextMenu] = useState({visible: false, x:0, y:0, assignmentId: null, selectedAssignment: null});

    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        quizId: string | null;
        selectedQuiz: Quiz | null;  
    }>({
        visible: false,
        x: 0,
        y: 0,
        quizId: null,
        selectedQuiz: null,
    });

    const handleContextMenu = (event : any, quiz : any) => {
        event.preventDefault();
        if (contextMenu.visible && contextMenu.quizId === quiz._id) {
            setContextMenu({...contextMenu, visible: false});
        } else {
            setContextMenu(
                {
                    visible: true,
                    x: event.clientX,
                    y: event.clientY,
                    quizId: quiz._id,
                    selectedQuiz: quiz
                }
            );
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<Quiz | null>(null);

    const handleShowDeleteModal = (quizId: Quiz | null) => {
        if (quizId) {
            const quiz = quizList.find(q => q._id === quizId);
            if(quiz) {
                setSelectedQuizId(quiz);
                setShowDeleteModal(true);
            }
        } 
    };

    const handleCloseDeleteModal = (e?: any) => {
        if (e) e.stopPropagation();
        setSelectedQuizId(null);
        setShowDeleteModal(false);
        setContextMenu({...contextMenu, visible: false});
    };

    const handleDeleteQuiz = async () => {
        if (selectedQuizId) {
            try {
                await deleteAllQuestions(selectedQuizId._id);
                await client.deleteQuiz(selectedQuizId._id);
                dispatch(deleteQuiz(selectedQuizId._id));
                handleCloseDeleteModal();
            } catch (error) {
                console.error("Error deleting quiz and associated questions:", error);
            }
        }
    };

    const handlePublish = (quizId : Quiz | null) => {
        if (!quizId) return;
        const quiz = quizList.find(q => q._id === quizId);
        if (quiz) {
            const updatedQuiz = {...quiz, isPublished: !quiz.isPublished};
            client.updateQuiz(updatedQuiz).then(() => {  
                dispatch(updateQuiz(updatedQuiz));
                
                setContextMenu({...contextMenu, visible: false});
            })
        }
    };

    const handleUnpublish = (quizId : Quiz | null) => {
        const updatedQuizzes = quizList.map(quiz => {
            if (quiz._id === quizId) {
                return { ...quiz, isPublished: false };
            }
            return quiz;
        });
        dispatch(updateQuiz(updatedQuizzes));  
    };

    const handleMenu = (action : any, quizId : any) => {
        switch (action) {
            case 'edit':
                break;
            case 'delete':
                break;
            case 'publish':
                break;
            default:
                break;            
        }
        setContextMenu({...contextMenu, visible: false});
    };

    const renderContextMenu = () => {
        if (!contextMenu.visible) return null;

        return (
            <ul className="list-group" style={{top: `${contextMenu.y}px`, left: `${contextMenu.x}px`, position:"fixed", zIndex:"1000", border:"1px solid #ccc", width:"60px", borderRadius: "5px"}}>
                <li className="list-group-item" style={{borderBottom: "1px solid #ccc", backgroundColor:"#f0f0f0"}}>
                    <button type="button"onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${contextMenu.selectedQuiz}`)}>
                        Edit
                    </button>
                </li>
                <li className="list-group-item" style={{borderBottom: "1px solid #ccc", backgroundColor:"#f0f0f0"}}>
                    <button type="button" onClick={(event) => {
                        event.stopPropagation();
                        if (contextMenu.selectedQuiz && contextMenu.selectedQuiz) {
                            handleShowDeleteModal(contextMenu.selectedQuiz);
                        }
                    }}>
                        Delete
                    </button>
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title >Confirm Delete</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" 
                                        onClick={
                                            handleDeleteQuiz
                                        }
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="secondary" 
                                        onClick={handleCloseDeleteModal}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                    </Modal>
                </li>
                <li className="list-group-item" style={{borderBottom: "1px solid #ccc", backgroundColor:"#f0f0f0"}}>
                    <button type="button" onClick={(event) => {
                        event.stopPropagation();
                        if (contextMenu.selectedQuiz && contextMenu.selectedQuiz) {
                            handlePublish(contextMenu.selectedQuiz);
                        }
                    }}>
                        {contextMenu.selectedQuiz && contextMenu.selectedQuiz.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                </li>
            </ul>
        );
    };
    


    return (
        <>
        <div className="flex-fill">
            {/* {<!-- Add buttons and other fields here -->} */}
            <div style={{margin:"5px", padding:"10px"}}>
                              <li className="list-group-item d-flex justify-content-end align-items-center">
                                <div className="col float-start">
                                  
                                  <input type="text" className="form-control w-25" id="points" placeholder="Search for Quiz"/>
                                </div>
                                {profile && (profile.role === "ADMIN" || profile.role === "FACULTY") && (
                                    <>
                                    <button type="button" className="btn btn-danger float end m-1"
                                    onClick={handleCreateQuiz}>
                                        + Quiz
                                    </button>
                                    <button type="button" className="btn btn-light float-end">
                                        <FaEllipsisV/>
                                    </button>
                                    </>
                                )}
                              </li>
                        
            </div>
            <hr style={{color:"grey", marginRight:"20px", marginLeft:"20px", marginTop:"10px", marginBottom:"10px"}} />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                        <FaCaretDown className="ms-2 me-2"/>
                        <span style={{fontWeight:"bold"}}>Assignment Quizzes</span>
                    
                    </div>
                    {profile && (profile.role === "ADMIN" || profile.role === "FACULTY") && (
                        <ul className="list-group">
                            {quizList
                            .filter((quiz) => quiz.course === courseId)
                            .map((quiz, index) => (
                            <li key={index} className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                                <RxRocket className="ms-3" style={{color:"green"}}/>                           
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3" >{quiz.title}</Link>
                                <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                    <Link to="#" className="" style={{textDecoration: "none", color:"grey", fontSize:"0.8em", marginLeft:"55px"}}>{determineQuizAvailability(quiz.availableFromDate, quiz.availableUntilDate)}  </Link> 
                                    <span style={{color:"grey", fontSize:"0.8em"}}>| Due {formatDate(quiz.dueDate)}  </span>
                                    {quiz.isPublished && (
                                        <>
                                            <span style={{color:"grey", fontSize:"0.8em"}}>| {quiz.pts} pts  </span>
                                            <span style={{color:"grey", fontSize:"0.8em"}}>| {quiz.Questions} Questions  </span>
                                        </>
                                    )}
                                    <span className="float-end">
                                            {quiz.isPublished ? (
                                                <FaCheckCircle className="text-success me-3" onClick={() => handlePublish(quiz._id)}/>
                                            ) : (
                                                <RiProhibitedLine className="text-muted me-3" onClick={() => handlePublish(quiz._id)} />
                                            )}
                                            <button onClick={(e) => handleContextMenu(e, quiz._id)} style={{backgroundColor:"white"}}>
                                                <FaEllipsisV className="me-4"/>
                                            </button>  
                                            {renderContextMenu()}  
                                    </span>
                                </div>    
                            </li>
                            ))}
                        </ul>
                    )}

                    {profile && (profile.role === "STUDENT" || profile.role === "USER") && (
                        <ul className="list-group">
                            {quizList
                            .filter((quiz) => quiz.course === courseId)
                            .map((quiz, index) => (
                            <li key={index} className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}}/> 
                                <RxRocket className="ms-3" style={{color:"green"}}/>                       
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`} style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="ms-3" >{quiz.title}</Link>
                                <div className="ms-3 mb-2" style={{flexWrap:"wrap", overflowWrap:"break-word"}}>    
                                    <Link to="#" className="" style={{textDecoration: "none", color:"grey", fontSize:"0.8em", marginLeft:"55px"}}>{determineQuizAvailability(quiz.availableFromDate, quiz.availableUntilDate)}  </Link> 
                                    <span style={{color:"grey", fontSize:"0.8em"}}>| Due {formatDate(quiz.dueDate)}  </span>
                                    {quiz.isPublished && (
                                        <>
                                            <span style={{color:"grey", fontSize:"0.8em"}}>| {quiz.pts} pts  </span>
                                            <span style={{color:"grey", fontSize:"0.8em"}}>| {quiz.Questions} Questions  </span>
                                        </>
                                    )}
                                </div>    
                            </li>
                            ))}
                        </ul>
                    )}  
                </li>
            </ul>
        </div>
        </>
    );

} 
export default Quizzes;