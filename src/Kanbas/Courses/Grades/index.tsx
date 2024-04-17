import { FaChevronDown, FaGear, FaGears, FaMagnifyingGlass } from "react-icons/fa6";
import { assignments, enrollments, grades, users } from "../../Database";
import { Link, useParams } from "react-router-dom";
import { CiFilter } from "react-icons/ci";

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);
    {console.log('courseId:', courseId)}
    {console.log('assignments for current course:', as.filter((assignment) => assignment.course === courseId))}

    return (
        <div className="flex-fill p-4">
            <div>
                <div >
                                    <li className="list-group-item d-flex justify-content-end align-items-center">
                                        <button type="button" className="btn btn-light float end m-2">
                                            <i className="fa-light fa-file-import"></i>Import
                                        </button>
                                        <div className="dropdown">
                                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-light fa-file-export"></i>Export
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                              <li><Link className="dropdown-item" to="#">Action</Link></li>
                                              <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                              <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-light float-end m-2">
                                            <FaGear/>
                                        </button>
                                    </li>
                               
                </div>

                <div>
                    <form className="row g-3">
                        <div className="col-md-6">
                                            <label htmlFor="search-students" className="form-label"><b>Student Names</b></label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text"><FaMagnifyingGlass/></span>
                                                <input type="text" className="form-control" placeholder="Search Students"/>
                                                <span className="input-group-text"><FaChevronDown/></span>
                                            </div>
                        </div>

                        <div className="col-md-6">
                                                <label htmlFor="search-students" className="form-label"><b>Assignment Names</b></label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><FaMagnifyingGlass/></span>
                                                    <input type="text" className="form-control" placeholder="Search Assignments"/>
                                                    <span className="input-group-text"><FaChevronDown/></span>
                                                </div>
                        </div>

                        <div className="col-12 mt-0">
                                            <button type="button" className="btn btn-light float end">
                                                <CiFilter/> Apply Filters
                                            </button>    
                        </div>
                    

                    </form>
                </div>

                <div className="mt-3">
                    <div className="table-responsive">
                        <table className="table table-striped table table-bordered">
                            {/* <thead>
                                <th>Student Name</th>
                                {as.map((assignment) => (<th>{assignment.title}</th>))}
                            </thead> */}
                            <tbody>
                                <tr>
                                    <th className="col-md-1">Student Name</th>
                                    {as.map((assignment) => (<th style={{textAlign:"center", width: "8%"}}>{assignment.title} <br /><span>Out of 100</span> </th>))}
                                </tr>
                                {es.map((enrollment) => {
                                const user = users.find((user) => user._id === enrollment.user);
                                return (
                                <tr key={enrollment.user}>
                                    <td style={{color:"crimson"}}>{user?.firstName} {user?.lastName}</td>
                                        {as.map((assignment) => {
                                        const grade = grades.find(
                                        (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                        return (<td><input type="number" className="form-control" value={grade?.grade || ""} style={{textAlign:"center", border:"none", backgroundColor:"transparent"}}/>
                                    </td>);})}
                                </tr>);
                                })}
                            </tbody>
                        </table>  
                    </div>
                </div>    
            </div>    
        </div>
    );
}
export default Grades;