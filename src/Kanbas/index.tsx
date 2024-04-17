import Account from "./Account";
import KanbasNavigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
// import * as db from "./Database";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const COURSES_API = `${API_BASE}/api/courses`;
    const findAllCourses = async () => {
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", courseNumber: "CS5610.35159.202430", 
        term: "202430_2 Spring 2024 Semester Full Term",
        termCode: "Spring 2 2024"
    });
    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([...courses, response.data]);
    };
    const deleteCourse = async (courseId: any) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}`
          );      
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course._id}`,
            course
          );      
        setCourses(
        courses.map((c) => {
            if (c._id === course._id) {
            return course;
            } else {
            return c;
            }
        })
        );
    };

    return (
    <Provider store={store}>
        <div className="d-flex">
            
            <KanbasNavigation/>
            
            <div style={{ flexGrow: 1 }}>
                {/* <h1>Account</h1>
                <h1>Dashboard</h1>
                <h1>Courses</h1> */}
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="Dashboard" element={<Dashboard 
                    // courses={courses}
                    // course={course}
                    // setCourse={setCourse}
                    // addNewCourse={addNewCourse}
                    // deleteCourse={deleteCourse}
                    // updateCourse={updateCourse}
                    />} />
                    {/* <Route path="Courses" element={<Courses />} /> */}
                    <Route path="Courses/:courseId/*" element={<Courses/>}/>
                </Routes>
            </div>
        </div>
    </Provider>    
    );
}
export default Kanbas;