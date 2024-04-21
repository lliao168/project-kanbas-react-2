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
import QuizMultipleChoiceEditor from './MultipleChoice';
import QuizTrueFalseEditor from './TrueFalse';
import QuizFillBlankEditor from './FillBlank';
import * as client from "./client"; 
import { Question, Blank, TrueFalse, Choice } from './client';
import * as clientQuiz from "../../client";  
import { addQuiz, updateQuiz } from '../../reducer';

function QuizQuestionsDetailEditor() {
    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState<Question>({
        _id: "", title: "New Question", quizId: '', question: 'The Question Description', points: 0, questionType: "Multiple Choice"});
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quiz = quizList.find(
        (quiz) => quiz.course === courseId && quiz._id === quizId 
    );

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionsData = await client.findQuestionsForQuiz(quizId);
                setQuestions(questionsData);
                setOriginalQuestions(questionsData);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [quizId]);
    
    if (!questions) {
        return <div>Loading...</div>;
    }

    const handleQuestionUpdate = (updatedQuestion: Question) => {
        const updatedQuestions = questions.map((q) =>
            q._id === updatedQuestion._id ? updatedQuestion : q
        );
        setQuestions(updatedQuestions);
    };

    const handleUpdateClick = async () => {
        try {
            await Promise.all(questions.map((question) => client.updateQuestion(question)));
            console.log("Questions updated successfully and ready for preview");
        } catch (error) {
            console.error("Error updating questions:", error);
        }
    };
    const handleCancel = () => {
        setQuestions(originalQuestions);
    };

    const handleCreateQuestion = async () => {
        try {
            const newQuestion = await client.createQuestion(quizId, question);
            setQuestions([ ...questions, newQuestion]);
        } catch (err) {
            console.log("failed to create question", err);
        }
    }

    const handleSaveAndPublish = () => {
        const updatedQuiz = {
            ...quiz,
            isPublished: quiz.isPublished ? quiz.isPublished : true
        };
        if (quizId && quizId !== 'new') {
            clientQuiz.updateQuiz(updatedQuiz).then(() => { 
                dispatch(updateQuiz(updatedQuiz)); })
        } else {
            if (courseId) {
            clientQuiz.createQuiz(courseId, updatedQuiz).then((createdQuiz) => { 
                dispatch(addQuiz(createdQuiz)); })
            }
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)
    }
    
    return(
        <div>
            {questions.map((question: any) => {
                        return (
                            <div key={question._id} className="row g-3 mt-2" style={{marginLeft:"20px", marginRight:"20px"}}>
                                {question && (
                                    <div className="col-md-6" style={{width:"200px"}} >
                                        <input
                                        value= {question.title}
                                        onChange={(e) => handleQuestionUpdate({...question, title: e.target.value})}
                                        className="form-control mb-2" />
                                    </div>
                                )}
                                {question && (
                                    <div className="col-md-6" style={{width:"300px"}}>
                                        <select
                                            id="questionTypeSelect"
                                            className="form-select"
                                            value={question.questionType}
                                            onChange={(e) => handleQuestionUpdate({...question, questionType: e.target.value})}
                                        >
                                            <option value="Multiple Choice">Multiple Choice</option>
                                            <option value="True/False">True/False</option>
                                            <option value="Fill In the Blank">Fill In the Blank</option>
                                        </select>  
                                    </div>  
                                )}
                           
                                {question && (        
                                    <div className="col-md-6 text-align:left flex-fill" >
                                        <input type="number"
                                            className="form-control float-end me-2"
                                            style={{width:"70px"}}
                                            id="pts"
                                            value={question.points}
                                            onChange={(e) => handleQuestionUpdate({...question, points: parseInt(e.target.value)})}
                                        />
                                        <label className="float-end mt-2 me-2">pts:</label>
                                    </div>  
                                )}
                                        {question.questionType === "Multiple Choice" && (
                                            <QuizMultipleChoiceEditor key={question._id} 
                                            question={question}
                                            setQuestions={setQuestions}
                                            onCancel={handleCancel}/>
                                        )}
                                        {question.questionType === 'True/False' && (
                                            <QuizTrueFalseEditor key={question._id} 
                                            question={question}
                                            setQuestions={setQuestions}
                                            onCancel={handleCancel}/>
                                        )}
                                        {question.questionType === 'Fill In the Blank' && (
                                            <QuizFillBlankEditor key={question._id}
                                            question={question}
                                            setQuestions={setQuestions}
                                            onCancel={handleCancel}/>
                                           
                                )}
                               
                            </div>  
                        );  
                        })}
                <hr style={{color:"black", marginLeft:"20px", marginRight:"20px"}} />
                <div className="d-flex justify-content-center mt-2">
                    <button onClick ={handleCreateQuestion} className="btn btn-light ms-3">
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
                              { quiz &&  
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} onClick={handleUpdateClick} className="btn btn-danger ms-2 float-end">
                                Save
                                </Link>
                              }
                                
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`} className="btn btn-light float-end ms-2"
                                onClick={() => {handleUpdateClick();  handleSaveAndPublish()}} 
                                >
                                   Save & Publish
                              </Link>
                               <Link to={"#"}
                                   onClick={() => {handleCancel()}} className="btn btn-light float-end">
                                   Cancel
                               </Link>
                           </div>    
                       </div>    
                      
               </div> 
    )
}
export default QuizQuestionsDetailEditor;
 
 
    // const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    // const question = questionList.find(
    //     (question) => question.quiz === quizId && question._id === questionId
    // );
 
    // const [showQuestionForm, setShowQuestionForm] = useState(true);
    // // const [questions, setQuestions] = useState<Question[]>([]);
    // const [questionType, setQuestionType] = useState('Multiple Choice');
    // const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
    // const [questionTitle, setQuestionTitle] = useState('');
    // const [points, setPoints] = useState(1);
 
    // const handleTitleChange = (value : any, questionId : any) => {
    //     const updatedQuestions = questionList.map(question => {
    //         if (question._id === questionId) {
    //             return {...question, title: value};
    //         }
    //         return question;
    //     });
    //     dispatch(setQuestions(updatedQuestions));
    // };
 
    // const handleQuestionChange = (value : any, questionId : any) => {
    //     // setQuizQuestion(value);
    //     // dispatch(updateAssignment({...assignment, description: value}));
    //     const updatedQuestions = questionList.map(question => {
    //         if (question._id === questionId) {
    //             return {...question, question: value};
    //         }
    //         return question;
    //     });
    //     dispatch(setQuestions(updatedQuestions));
    // };
 
    // const handlePointsChange = (value : any, questionId : any) => {
    //     const updatedQuestions = questionList.map(question => {
    //         if (question._id === questionId) {
    //             return {...question, points: value};
    //         }
    //         return question;
    //     });
    //     dispatch(setQuestions(updatedQuestions));
    // };
 
    // const handleQuestionTypeChange = (newType : any, questionId : any) => {
    //     const updatedQuestions = questionList.map(question => {
    //         if (question._id === questionId) {
    //             return {...question, questionType: newType};
    //         }
    //         return question;
    //     });
    //     dispatch(setQuestions(updatedQuestions));
    // };
 
    // const createDefaultQuestion = () => {
    //     return {
    //         _id: new Date(),
    //         title: "New Question Title",
    //         quiz: quizId,  
    //         question: "New Question",
    //         points: 0,
    //         questionType: "Multiple Choice",
    //     };
    // };
 
    // const handleAddQuestionClick = async () => {
    //     if (quizId) {
    //         const newQuestion = createDefaultQuestion();
    //         const createdQuestion = await client.createQuestion(quizId, newQuestion)
    //         if (createdQuestion && createdQuestion._id) {
    //             dispatch(addQuestion(createdQuestion))
    //             dispatch(selectQuestion(createdQuestion));
    //             setShowQuestionForm(true);
    //         }
    //     }
    // };
 
 
    // const handleSave = () => {
       
    // };
 
    // const handleCancel = () => {
    //     // setShowQuestionForm(false);
    //     // if (questions.length === 1 && questions[0].id === currentQuestionId) {
    //     //     setQuestions([]);  
    //     // } else {
    //     //     setQuestions(questions.filter(question => question.id !== currentQuestionId));
    //     //     setCurrentQuestionId(null);
    //     // }
    // };
   
 
    // return(
    //     <div>
    //             {questionList.length > 0 && questionList.map((question, index) => {
    //                     return (
    //                         <div key={question._id} className="row g-3 mt-2" style={{marginLeft:"20px", marginRight:"20px"}}>
    //                             {question && (
    //                                 <div className="col-md-6" style={{width:"200px"}} >
    //                                     <input
    //                                     value= {question.title}
    //                                     onChange={(e) => handleTitleChange(e.target.value, question._id)}
    //                                     className="form-control mb-2" />
    //                                 </div>
    //                             )}
    //                             {question && (
    //                                 <div className="col-md-6" style={{width:"300px"}}>
    //                                     <select
    //                                         id="questionTypeSelect"
    //                                         className="form-select"
    //                                         value={question.questionType}
    //                                         onChange={(event) => handleQuestionTypeChange(event.target.value, question._id)}
    //                                     >
    //                                         <option value="Multiple Choice">Multiple Choice</option>
    //                                         <option value="True/False">True/False</option>
    //                                         <option value="Fill In The Blank">Fill In the Blank</option>
    //                                     </select>  
    //                                 </div>  
    //                             )}
                           
    //                             {question && (        
    //                                 <div className="col-md-6 text-align:left flex-fill" >
    //                                     <input type="number"
    //                                         className="form-control float-end me-2"
    //                                         style={{width:"70px"}}
    //                                         id="pts"
    //                                         value={question.points}
    //                                         onChange={(e) => handlePointsChange(e.target.value, question._id)}
    //                                     />
    //                                     <label className="float-end mt-2 me-2">pts:</label>
    //                                 </div>  
    //                             )}
    //                                     {question.questionType === "Multiple Choice" && (
    //                                         <QuizMultipleChoiceEditor onCancel={handleCancel}/>
    //                                     )}
    //                                     {question.questionType === 'True/False' && (
    //                                         <QuizTrueFalseEditor onCancel={handleCancel}/>
    //                                     )}
    //                                     {question.questionType === 'Fill In The Blank' && (
    //                                         <QuizFillBlankEditor onCancel={handleCancel}/>
                                           
    //                             )}
                               
    //                         </div>  
    //                     );  
    //             })}      
                 
 
    //             <hr style={{color:"black", marginLeft:"20px", marginRight:"20px"}} />
           
    //             <div className="d-flex justify-content-center mt-2">
    //                         <button className="btn btn-light ms-3" onClick={handleAddQuestionClick}>
    //                         + New Question
    //                         </button>
    //                         <Link to={"#"} className="btn btn-light ms-4">
    //                             + New Question Group
    //                         </Link>
    //                         <Link to={"#"}
    //                             className="btn btn-light ms-4">
    //                             <CiSearch className="me-2"/>Find Questions
    //                         </Link>
    //             </div>
 
    //             <hr style={{color:"grey", marginLeft:"20px", marginRight:"20px"}} />
 
    //             <div className="row g-3" style={{marginLeft:"20px", marginRight:"20px"}}>
    //                 <div className="col-md-6 text-align:left">
    //                                     <div className="form-check">
    //                                         <input className="form-check-input" type="checkbox" id="gridCheck"/>
    //                                         <label className="form-check-label" htmlFor="gridCheck">
    //                                           Notify users that this quiz has changed
    //                                         </label>
    //                                     </div>
    //                 </div>
   
    //                 <div className="col-md-6 text-align:left ">
    //                     <button onClick={handleSave}  className="btn btn-danger ms-2 float-end">
    //                     Save
    //                     </button>
    //                     <Link to={"#"} className="btn btn-light float-end ms-2">
    //                         Save & Publish
    //                     </Link>
    //                     <Link to={"#"}
    //                         onClick={() => {handleCancel()}} className="btn btn-light float-end">
    //                         Cancel
    //                     </Link>
    //                 </div>    
    //             </div>    
               
    //     </div>
    // );
