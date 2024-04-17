import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import { courses } from "../../Database";

function CourseNavigation() {
    const { courseId } = useParams();
    const courseTerm = courses.filter((course) => course._id === courseId);
    const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Video", 
    "Discussions", "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"];
    const { pathname } = useLocation();
    return (
        
        <ul className="wd-navigation">
            {courseTerm.map((course) => (<span style={{color:"grey", fontSize:"12px", 
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", marginLeft: "10px"}}>{course.term}</span>))}
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
                    <Link to={link}>{link}</Link>
                </li>
            ))}
        </ul>
    );
    }
    export default CourseNavigation;