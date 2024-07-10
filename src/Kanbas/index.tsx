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
import * as clientUser from "../Users/client"
import Calendar from "./Calendar";
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

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const account = await clientUser.profile();
                const formattedDob = account.dob ? new Date(account.dob).toISOString().split('T')[0] : '';
                const updatedAccount = { ...account, dob: formattedDob };
                setProfile(updatedAccount);
                
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                
            }
        };
        fetchProfile();
    }, [profile]);


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
                    <Route path="Dashboard" element={<Dashboard profile={profile}/>} />
                    <Route path="Courses" element={<Dashboard profile={profile}/>} />
                    <Route path = "Calendar" element={<Calendar/>}/>
                    <Route path="Courses/:courseId/*" element={<Courses profile={profile}/>}/>
                </Routes>
            </div>
        </div>
    </Provider>    
    );
}
export default Kanbas;