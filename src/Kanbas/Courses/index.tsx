// import { useParams } from "react-router";
import { courses } from "../../Kanbas/Database";
import { Link, Navigate, Route, Routes, useParams, useLocation, useNavigate } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { FaGlasses } from "react-icons/fa6";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { FaArrowCircleRight, FaBook, FaClock, FaDesktop, FaInbox, FaRegCalendarAlt, FaRegQuestionCircle, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { FaChevronRight} from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { FaCircleNodes } from "react-icons/fa6";
import { LuPlug2 } from "react-icons/lu";
import { FaFilePen } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { CiBullhorn } from "react-icons/ci";
import { FaRegFileLines } from "react-icons/fa6";
import { FaRegFolderClosed } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa6";
import "./index.css";
import { assignments } from "../Database";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetailsScreen from "./Quizzes/Details";
import QuizDetailsEditor from "./Quizzes/Editor/DetailsEditor";
import QuizEditor from "./Quizzes/Editor";
import QuizQuestionsDetailEditor from "./Quizzes/Editor/QuestionsEditor";

import * as client from "./client";
import { Course } from "./client";
import QuizPreview from "./Quizzes/Preview";
const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
        const { courseId } = useParams();
        const COURSES_API = `${API_BASE}/api/courses`;
        const [courses, setCourses] = useState<Course[]>([]);
        const [course, setCourse] = useState<any>({ _id: "", name: "", 
        courseNumber: "", term: "", number: "", startDate: "", endDate: "", termCode: "", image: ""});
        const createCourse = async () => {
            try {
                const newCourse = await client.createCourse(course);
                setCourses([newCourse, ...courses]);
            } catch (err) {
                console.log(err);
            }
        };
        const deleteCourse = async (course: Course) => {
            if (!course._id) {
              console.error("Course ID is undefined, cannot delete:", course);
              return;
            }
            try {
              await client.deleteCourse(course);
              setCourses(courses.filter((u) => u._id !== course._id));
            } catch (err) {
              console.log(err);
            }
          };
          const selectCourse = async (course: Course) => {
            try {
              const u = await client.fetchCourseById(course._id);
              setCourse(u);
            } catch (err) {
              console.log(err);
            }
          };
          const updateCourse = async () => {
            try {
              const status = await client.updateCourse(course);
              setCourses(courses.map((u) =>
                (u._id === course._id ? course : u)));
            } catch (err) {
              console.log(err);
            }
          };
          const fetchAllCourses = async () => {
            const courses = await client.fetchAllCourses();
            setCourses(courses);
          };

        const findCourseById = async (courseId?: string) => {
            const response = await axios.get(
            `${COURSES_API}/${courseId}`
            );
            setCourse(response.data);
        };
        useEffect(() => {
            findCourseById(courseId);
          }, [courseId]);        
        // const course = courses.find((course) => course._id === courseId);
        const { assignmentId } = useParams();
        const assignmentList = assignments.find((assignment) => assignment._id === assignmentId);
        const links = ["Home", "Modules", "Piazza", "Zoom%20Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto%20Video", 
        "Discussions", "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"];
        const { pathname } = useLocation();
        const navigate = useNavigate();
        console.log("pathname:", pathname);
        console.log("links array:", links);

    return (
        <div>
                <div className="d-none d-md-block">
                        {/* <h4><HiMiniBars3 style={{color:"crimson", fontWeight:"normal"}}/> {course?.name}</h4> */}
                        <li className="d-flex justify-content-end align-items-center" style={{ marginLeft: "20px"}}>
                                    <div className="col-auto">
                                        <button className="btn btn-primary border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#collpaseKanbasNavigation" aria-expanded="false" aria-controls="collpaseKanbasNavigation" style={{backgroundColor: "white"}}>
                                            <HiMiniBars3 style={{color:"crimson", fontWeight:"normal"}}/>
                                        </button>
                                    </div>    

                                    <div className="collapse collapse-horizontal" id="collpaseKanbasNavigation">
                                        <div className="card card-body">
                                            <div>
                                                <ul className="wd-kanbas-navigation-narrow">     
                                                    <div className="d-flex align-items-center">
                                                        <div className="col-6">
                                                            <span><img src="/images/canvaslogo.png" width="200px"/></span>
                                                        </div>    
                                                        <div className="col-6">
                                                            <button type="button" className="btn-close float-end" data-bs-toggle="collapse" data-bs-target="#collpaseKanbasNavigation" aria-label="Close"></button>
                                                        </div>    
                                                    </div>    
                                                    
                                                    <li className="wd-active">
                                                        <div className="col-6">    
                                                            <Link to="/Kanbas/Dashboard">
                                                                <FaTachometerAlt/> 
                                                                <span>Dashboard</span>
                                                            </Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">    
                                                            <Link to="/Kanbas/Account">
                                                            <FaUserCircle style={{color:"grey"}}/>Account</Link>
                                                        </div>
                                                        <div className="col-6">
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="/Kanbas/Courses/">
                                                            <FaBook/>Courses</Link>
                                                        </div>  
                                                        <div className="col-6">  
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                                
                                                        </div>        
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaRegCalendarAlt/>Calendar</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaInbox/>Inbox</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaClock/>History</Link>
                                                        </div>
                                                        <div className="col-6">    
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">    
                                                            <Link to="#"><FaDesktop/>Studio</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="#"><FaArrowCircleRight/>Commons</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="#"><FaRegQuestionCircle/>Help</Link>
                                                        </div>
                                                        <div className="col-6">        
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>    
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-grow-1 align-item-center mt-3">
                                        <nav style={{ "--bs-breadcrumb-divider": "'>'" } as any} aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                               
                                            <li className="breadcrumb-item"><Link to={`/Kanbas/Courses/${course?._id}/Home`} style={{textDecoration: "none", color:"crimson"}}>{course?.name}</Link></li>
                                            
                                            
                                            <li className="breadcrumb-item active" aria-current="page">
                                                <span>{decodeURIComponent(links.find(link => pathname.includes(link)) || "")}</span>
                                            </li>

                                            </ul>
                                        </nav>   
                                    </div>    
                                    <div>
                                        <button type="button" className="btn btn-light">
                                            <FaGlasses/><span className="ms-2">Student View</span>
                                        </button>
                                    </div>    
                        </li>

                        <hr style={{marginTop:"2px", marginLeft:"30px", color:"grey"}} />
                                    
                </div> 

                

                <div className="d-block d-md-none">
                    <li className="list-group-item d-flex justify-content-start align-items-center" style={{backgroundColor:"black"}}>
                        <div className="col float-start">
                            <button className="btn btn-primary border border-black me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collpaseKanbasNavigation" aria-expanded="false" aria-controls="collpaseKanbasNavigation" style={{backgroundColor: "black"}}>
                                <HiMiniBars3 style={{color:"white"}}/>
                            </button>
                        </div>   
                        <div className="d-flex align-items-center flex-grow-1 p-2 ms-5"> 
                            <div className="center-text">
                                <div>{course?.courseNumber}</div>
                                <div>{decodeURIComponent(links.find(link => pathname.includes(link)) || "")}</div>
                            </div>    
                        </div>
                        <button type="button" className="btn btn-dark border-black float-end">
                            <FaGlasses/>
                        </button>
                        <button className="btn btn-dark border border-black float-end me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collpaseCourseNavigation" aria-expanded="false" aria-controls="collpaseCourseNavigation">
                            <FaChevronDown style={{color:"white"}}/>
                        </button>
                        
                    </li>
                    
                    <div className="collapse collapse-horizontal" id="collpaseKanbasNavigation">
                                        <div className="card card-body">
                                            <div>
                                                <ul className="wd-kanbas-navigation-narrow">     
                                                    <div className="d-flex align-items-center">
                                                        <div className="col-6">
                                                            <span><img src="/images/canvaslogo.png" width="200px"/></span>
                                                        </div>    
                                                        <div className="col-6">
                                                            <button type="button" className="btn-close float-end" data-bs-toggle="collapse" data-bs-target="#collpaseKanbasNavigation" aria-label="Close"></button>
                                                        </div>    
                                                    </div>    
                                                    
                                                    <li className="wd-active">
                                                        <div className="col-6">    
                                                            <Link to="/Kanbas/Dashboard">
                                                                <FaTachometerAlt/> 
                                                                <span>Dashboard</span>
                                                            </Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">    
                                                            <Link to="/Kanbas/Account">
                                                            <FaUserCircle style={{color:"grey"}}/>Account</Link>
                                                        </div>
                                                        <div className="col-6">
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="/Kanbas/Courses/">
                                                            <FaBook/>Courses</Link>
                                                        </div>  
                                                        <div className="col-6">  
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                                
                                                        </div>        
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaRegCalendarAlt/>Calendar</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaInbox/>Inbox</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6"> 
                                                            <Link to="#"><FaClock/>History</Link>
                                                        </div>
                                                        <div className="col-6">    
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">    
                                                            <Link to="#"><FaDesktop/>Studio</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="#"><FaArrowCircleRight/>Commons</Link>
                                                        </div>    
                                                    </li>

                                                    <li>
                                                        <div className="col-6">
                                                            <Link to="#"><FaRegQuestionCircle/>Help</Link>
                                                        </div>
                                                        <div className="col-6">        
                                                            <button className="btn btn-primary border border-white float-end" type="button" data-bs-toggle="collapse" aria-expanded="false" style={{backgroundColor: "white"}}>
                                                                <FaChevronRight style={{fontSize:"1em", color:"black"}}/>
                                                            </button>
                                                        </div>    
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                    </div>
                
                    <div className="collapse" id="collpaseCourseNavigation">
                        <div className="card card-body">
                            <div>
                                <button type="button" className="btn-close float-end" data-bs-toggle="collapse" data-bs-target="#collpaseCourseNavigation" aria-label="Close"></button>
                            </div>
                            <ul className="wd-course-navigation-narrow">
                                <li className="wd-active"><Link to="/Kanbas/Courses">
                                    <AiOutlineHome/>Home</Link>
                                </li>
                                <li>
                                    <Link to="/Kanbas/Courses/Modules">
                                        <FaCircleNodes/>Modules</Link>
                                </li>
                                <li><Link to="#">
                                    <LuPlug2/>Piazza</Link>
                                </li>
                                <li><Link to="#">
                                    <LuPlug2/>Zoom Meetings</Link>
                                </li>
                                <li><Link to="/Kanbas/Courses/Assignments">
                                    <FaFilePen/>Assignments</Link>
                                </li>
                                <li><Link to="/Kanbas/Courses/Quizzes">
                                    <IoRocketOutline/>Quizzes</Link>
                                </li>
                                <li><Link to="/Kanbas/Courses/Grades">
                                    <SlNotebook/>Grades</Link>
                                </li>
                                <li><Link to="#">
                                    <FaUserGroup/>People</Link>
                                </li>
                                <li><Link to="#">
                                    <LuPlug2/>Panopto Video</Link>
                                </li>
                                <li><Link to="#">
                                    <TiMessages/>Discussions</Link>
                                </li>
                                <li><Link to="#">
                                    <CiBullhorn/>Announcements</Link>
                                </li>
                                <li><Link to="#">
                                    <FaRegFileLines/>Pages</Link>
                                </li>
                                <li><Link to="#">
                                    <FaRegFolderClosed/>Files</Link>
                                </li>
                                <li><Link to="#">
                                    <LuClipboardList/>Rubrics</Link>
                                </li>
                                <li><Link to="#">
                                    <FaBullseye/>Outcomes</Link>
                                </li>
                                <li><Link to="#">
                                    <FaRegCircle/>Collaborations</Link>
                                </li>
                                <li><Link to="#">
                                    <SlNotebook/>Syllabus</Link>
                                </li>
                                <li><Link to="#">
                                    <LuPlug2/>Progress Reports(EAB Navigate)</Link>
                                </li>
                                <li><Link to="/Kanbas/Courses/Settings">
                                    <GoGear/>Settings</Link>
                                </li>
                            </ul>          
                        </div>
                    </div>
                </div>    

                <CourseNavigation />
                <div>
                    <div
                        className="overflow-y-scroll position-fixed bottom-0 end-0"
                        style={{ left: "260px", top: "60px" }} >
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home/>} />
                            <Route path="Modules" element={<Modules/>} />
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>} />
                            <Route path="Assignments" element={<Assignments/>} />
                            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
                            <Route path="Quizzes" element={<Quizzes/>} />
                            <Route path="Quizzes/:quizId" element={<QuizDetailsScreen/>}/>
                            <Route path="Quizzes/:quizId/Editor" element={<QuizEditor/>}/>
                            <Route path="Quizzes/:quizId/Editor/DetailsEditor" element={<QuizDetailsEditor/>}/>
                            <Route path="Quizzes/:quizId/Editor/QuestionsEditor" element={<QuizQuestionsDetailEditor/>}/>
                            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview/>}/>
                            <Route path="Grades" element={<Grades />} />
                            <Route path="People" element={<h1>People</h1>} />
                            <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
                            <Route path="Discussions" element={<h1>Discussions</h1>} />
                            <Route path="Annoucements" element={<h1>Announcements</h1>} />
                            <Route path="Pages" element={<h1>Pages</h1>} />
                            <Route path="Files" element={<h1>Files</h1>} />
                            <Route path="Rubrics" element={<h1>Rubrics</h1>} />
                            <Route path="Outcomes" element={<h1>Outcomes</h1>} />
                            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
                            <Route path="Syllabus" element={<h1>Syllabus</h1>} />
                            <Route path="Settings" element={<h1>Settings</h1>} />
                        </Routes>
                    </div>
                </div>
        </div>
    )
}

export default Courses;