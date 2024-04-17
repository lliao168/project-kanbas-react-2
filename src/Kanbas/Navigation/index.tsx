import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { 
    FaTachometerAlt, 
    FaRegUserCircle, 
    FaBook, 
    FaRegCalendarAlt,
    FaInbox,
    FaClock,
    FaDesktop,
    FaArrowCircleRight,
    FaRegQuestionCircle,
    FaUserCircle
} from "react-icons/fa";


function KanbasNavigation() {
    const links = [    
    { label: "Account", icon: <FaUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 icon" /> },
    { label: "Courses", icon: <FaBook className="fs-2 icon" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 icon" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2 icon" /> },
    { label: "History", icon: <FaClock className="fs-2 icon" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2 icon" /> },
    { label: "Commons", icon: <FaArrowCircleRight className="fs-2 icon" /> },
    { label: "Help", icon: <FaRegQuestionCircle className="fs-2 icon" /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li>
                <Link to={"/Kanbas/Dashboard"}>
                    <img src= "/images/NEUlogo.png" style={{height: "60px"}}/>
                </Link>    
            </li>
            {links.map((link, index) => (
            <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                <Link to={`/Kanbas/${link.label}`}> 
                {link.icon} {link.label} </Link>
            </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;