import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as client from "../Courses/client";
import * as db from "../Database";
import { courses } from "../Database";
import { FaEllipsisVertical, FaFilePen} from "react-icons/fa6";
import "./index.css";

function Dashboard() {
    interface Course {
        _id: string;
        name: string;
        number: string;
        startDate: string;
        endDate: string;
        courseNumber: string;
        term: string;
        termCode: string;
        image: string;
      }
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState( {
        _id: "0", name: "New Course", number: "New Number",
        startDate: "", endDate: "",
        image: "/images/reactjs.jpg", courseNumber: "New Course Number", term: "New Course Term",
        termCode: "New Course Term Code"
      });

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


    // const fetchAllCourses = async () => { 
    //     const courses = await client.fetchAllCourses();
    //     setCourses(courses);
    // };
    // const createCourse = async () => {
    //     const newCourse = await client.createCourse(course);
    //     fetchAllCourses();
    //     setCourses([newCourse, ...courses]);
    // }
    // const deleteCourse = async (id: string) => {
    //     await client.deleteCourse(id);
    //     fetchAllCourses();
    // }
    // const updateCourse = async (id: string) => {
    //     if (course && course._id) {
    //         await client.updateCourse(course, course._id);
    //         fetchAllCourses(); 
    //     }
    // }


    useEffect(() => {
        fetchAllCourses();
    }, []);
    // const [db_courses, setCourses] = useState(courses);
    // const [course, setCourse] = useState( {
    //     _id: "0", name: "New Course", number: "New Number",
    //     startDate: "2023-09-10", endDate: "2023-12-15",
    //     image: "/images/reactjs.jpg", courseNumber: "CS5610.35159.202430", term: "202430_2 Spring 2024 Semester Full Term",
    //     termCode: "Spring 2 2024"
    //   });
    // const updateCourse = () => {
    //     setCourses(
    //       courses.map((c) => {
    //         if (c._id === course._id) {
    //           return course;
    //         } else {
    //           return c;
    //         }
    //       })
    //     );
    // };
    
    // const addNewCourse = () => {
    //     const newCourse = { ...course,
    //                         _id: new Date().getTime().toString() };
    //     setCourses([...db_courses, { ...course, ...newCourse }]);
    // };
    // const deleteCourse = (courseId: string) => {
    //     setCourses(courses.filter((course) => course._id !== courseId));
    // };
    


    return (
        <div className="p-4">
        <h1>Dashboard</h1> 
        <h5>Course</h5>
        <input value={course.name} className="form-control" 
            onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <input value={course.number} className="form-control mt-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
        <input value={course.startDate} className="form-control mt-2" type="date"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
        <input value={course.endDate} className="form-control mt-2" type="date" 
            onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
        <input value={course.courseNumber} className="form-control mt-2" type="form-control" 
             onChange={(e) => setCourse({ ...course, courseNumber: e.target.value }) } />
        <input value={course.term} className="form-control mt-2" type="form-control" 
             onChange={(e) => setCourse({ ...course, term: e.target.value }) } />
        <input value={course.termCode} className="form-control mt-2" type="form-control"
             onChange={(e) => setCourse({ ...course, termCode: e.target.value }) } />
        <button className="btn btn-success me-2 mt-2" onClick={createCourse} >
            Add
        </button>
        <button className="btn btn-primary mt-2" onClick={(event) => {event.preventDefault();
                                    updateCourse();
                                    }}>
            Update
        </button>


        <hr />
        <h2 className="ms-4">Published Courses ({courses.length})</h2> 
        <hr className="ms-4 mb-0"/>
        <div className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4 mt-0 ms-2">
              {courses.map((course: any) => (<div key={course._id} className="col" style={{width: "300px"}}>
                    <div className="card">
                        <img src={`/images/${course.image}`} className="card-img-top"
                            style={{height: "150px"}}/>
                        <Link to={"#"} className="position-absolute top-0 end-0 p-3"><FaEllipsisVertical style={{color:"white", fontSize:"20px"}}/></Link>    
                        <div className="card-body">
                            <Link className="card-title" to={`/Kanbas/Courses/${course._id}`}
                                style={{textDecoration: "none", color: "navy", fontWeight: "bold", 
                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block"}}>
                                    {course.name}
                                
                            </Link>
                                
                            <p className="card-text mb-0" style={{ color:"grey", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block"}}>{course.courseNumber}</p>
                            <p className="card-text" style={{ fontSize: '12px', color:"grey", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block"}}>{course.term}</p>
                            {/* <Link to={`/Kanbas/Courses/${course._id}/Home`}> <FaFilePen style={{ color: "grey"}}/></Link> */}
                            <button style={{backgroundColor:"white", border:"none"}} onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                            }}>
                                <FaFilePen style={{ color: "grey"}}/>
                            </button>

                            <button className="float-end btn btn-danger" onClick={() => {
                                    // event.preventDefault();
                                    deleteCourse(course);
                                    }}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    </div>
    );
}
export default Dashboard;