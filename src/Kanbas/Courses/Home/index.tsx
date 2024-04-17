import { Link } from "react-router-dom";
import ModuleList from "../Modules/list";
import { FaArrowRightFromBracket, FaBan, FaChartSimple, FaCircle, FaCircleCheck, FaFileImport, FaXmark } from "react-icons/fa6";
import {PiCrosshairLight} from "react-icons/pi";
import { FaBullhorn, FaRegBell } from "react-icons/fa";
import { Bs1CircleFill } from "react-icons/bs";
import { VscCircleSmallFilled } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import "./index.css";
import { assignments, courses } from "../../Database";
import { useParams } from "react-router-dom";

function Home() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
    const course = courses.find((course) => course._id === courseId);

    return (
        <div className="d-flex p-3"> 
            {/* <h2>Home</h2> */}
            <div className="flex-fill">
                <ModuleList />
            </div>

            {/* <h2>Status</h2> */}
            <div className="mt-3 d-none d-lg-block course-status">
                {/* <!-- Implement Course Status here --> */}
               
                    <span>Course Status</span>
                                    <div>
                                        <li className="list-group-item">
                                            <button className="btn btn-light">
                                            <FaBan/> Unpublish</button>
                                            <button className="btn btn-success">
                                            <FaCircleCheck style={{color:"white"}}/> Published</button>
                                        </li> 
                                    </div>    
                                        
                                        <div className="d-grid gap-2 mt-3">
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaFileImport style={{marginRight:"5px"}}/>
                                                Import Existing Content
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaArrowRightFromBracket style={{marginRight:"5px"}}/>
                                                Import from Commons
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <PiCrosshairLight style={{marginRight:"5px"}}/>
                                                Choose Home Page
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaChartSimple style={{marginRight:"5px"}}/>
                                                View Course Stream
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaBullhorn style={{marginRight:"5px"}}/>
                                                Announcement
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaChartSimple style={{marginRight:"5px"}}/>
                                                New Analytics
                                            </button>
                                            <button className="btn btn-light" style={{margin:"0px", width:"230px", textAlign:"left"}}>
                                                <FaRegBell style={{marginRight:"5px"}}/>
                                                View Course Notifications
                                            </button>
                                        </div>
                                        
                                   
                                    
                                    <div>
                                        
                                        <div className="mt-3">     
                                            <span>TO DO</span>
                                            <hr style={{color:"grey"}} />
                                            <FaXmark className="float-end"/>
                                            {assignmentList.map((assignment) => (
                                            <div className="mt-2">
                                                <Link to="#" style={{color:"crimson", textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block"}}><Bs1CircleFill style={{color:"crimson"}}/> {assignment.title} </Link> 
                                                <div className="ms-4" style={{color:"grey", fontSize: "12px"}}>
                                                    <label>100 points <FaCircle style={{fontSize:"0.5em"}}/> Sep 18 at 11:59pm</label>
                                                </div> 
                                            </div>))}
                                        </div> 
                                        
                                        <div className="mt-3">
                                            <span>Comming Up</span><Link to="#" style={{color:"crimson", textDecoration: "none", fontSize:"12px"}} className="float-end"><IoCalendarNumberOutline style={{color:"grey"}}/> <span>View Calendar</span></Link>
                                            <hr style={{color:"grey"}} />
                                            
                                            <div className="mt-2">
                                                <Link to="#" style={{color:"crimson", textDecoration: "none"}}><IoCalendarNumberOutline style={{color:"grey"}}/> Lecture</Link>
                                                <div className="ms-4" style={{fontSize:"12px"}}>
                                                    <label style={{color:"grey"}}>Lecture {course?.courseNumber}</label>
                                                    <label style={{color:"grey"}}>Sep 7 at 11:45am</label>
                                                </div>
                                                
                                            </div>
                                            <div className="mt-3">
                                                <Link to="#" style={{color:"crimson", textDecoration: "none"}}><IoCalendarNumberOutline style={{color:"grey"}}/> {course?._id} 06 SP23 Lecture</Link>
                                                <div className="ms-4" style={{fontSize:"12px"}}>
                                                    <label style={{color:"grey"}}>Lecture {course?.courseNumber}</label>
                                                    <label style={{color:"grey"}}>Sep 11 at 6pm</label>    
                                                </div>                              
                                            </div>
                                        </div>
                                            <div className="mt-3">
                                                <div className="row">
                                                    <div className="col-auto">
                                                        
                                                            <div className="d-flex">
                                                                <div className="mt-1">
                                                                    <Link to="#" style={{color:"crimson", textDecoration: "none"}}><IoCalendarNumberOutline style={{color:"grey"}}/></Link>
                                                                </div>  
                                                                <div className="ms-1 mt-1">      
                                                                    <span style={{color:"crimson"}}>{course?.name}  {course?.termCode} - LECTURE</span>
                                                                </div>    
                                                            </div>
                                                        
                                                        <div className="ms-4" style={{fontSize:"12px"}}>
                                                            <label style={{color:"grey"}}>Lecture {course?.courseNumber}</label>
                                                            <label style={{color:"grey"}}>Sep 11 at 7pm</label>
                                                        </div>  
                                                    </div>
                                                </div>                                 
                                            </div>
            
                                            <div className="mt-2" style={{fontSize:"12px"}}>
                                                <Link to="#" style={{color:"crimson", textDecoration: "none"}}> 12 more in the next week...</Link>
                                            </div>
                                    </div>
                                    
            </div>
        </div>
    );
}
export default Home;