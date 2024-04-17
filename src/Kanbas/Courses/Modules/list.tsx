import React, { useState, useEffect } from "react";
import "./index.css";
// import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GrLink } from "react-icons/gr";
import { FaArrowRightFromBracket, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";
import { findModulesForCourse, createModule } from "./client";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
          .then((modules) =>
            dispatch(setModules(modules))
        );
      }, [courseId]);    
    // const modulesList = modules.filter((module) => module.course === courseId);
    // const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    // const [moduleList, setModuleList] = useState<any[]>(modules);
    // const [module, setModule] = useState({
    //     _id: "0", name: "New Module",
    //     description: "New Description",
    //     course: courseId || "",
    // });
    // const addModule = (module: any) => {
    //     const newModule = { ...module,
    //       _id: new Date().getTime().toString() };
    //     const newModuleList = [newModule, ...moduleList];
    //     setModuleList(newModuleList);
    // };
    interface Lesson {
        _id: string;
        name: string;
        description: string;
        module?: string; // include other properties as needed and use '?' for optional properties
    }
    // const deleteModule = (moduleId: string) => {
    //     const newModuleList = moduleList.filter(
    //       (module) => module._id !== moduleId );
    //     setModuleList(newModuleList);
    // };
    // const updateModule = () => {
    //     const newModuleList = moduleList.map((m) => {
    //       if (m._id === module._id) {
    //         return module;
    //       } else {
    //         return m;
    //       }
    //     });
    //     setModuleList(newModuleList);
    // };
    const moduleList = useSelector((state: KanbasState) => 
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) => 
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const handleAddModule = () => {
        if(courseId) {
            client.createModule(courseId, module).then((module) => {
                dispatch(addModule(module));
            });
        }
      };

    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
          dispatch(deleteModule(moduleId));
        });
      };     

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };
   
    
    
    return (
        <>
            {/* <!-- Add buttons here --> */}
            <div>
                <li className="list-group-item d-flex justify-content-end align-items-center buttons mt-3">
                    <button className="btn btn-light float-end m-1">Collapse All</button>
                    <button className="btn btn-light float-end m-1">View Progress</button>
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaCheckCircle className="me-2" style={{color:"green"}}/>Push All
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-danger float-end m-1">+ Module</button>
                    <button type="button" className="btn btn-light float-end m-1">
                        <FaEllipsisV/>
                    </button>
                </li>

                <hr style={{color:"grey", marginLeft:"20px", marginRight:"20px"}} />
                                        
            </div>
            <ul className="list-group wd-modules">
                {/* <li className="list-group-item" style={{backgroundColor:"white", border:"white"}}> */}
                    <div className="row g-3">
                        <div className="col-md-6 d-flex align-items-center">
                            <input className="form-control mb-2" 
                            style={{border:"1px solid #d3d3d3", borderRadius: '5px', height:"35px"}}
                            value={module.name} 
                            onChange={(e) => 
                                dispatch(setModule({ ...module, name: e.target.value }))
                            } 
                            />
                            <button className="btn btn-primary mb-2 ms-2" onClick={handleUpdateModule} style={{height:"30px", width:"80px", borderRadius: '5px'}}>
                                Update
                            </button>
                            <button className="btn btn-success float-end mb-2 ms-2" onClick={handleAddModule} style={{height:"30px", width:"50px", borderRadius: '5px'}}>
                                    Add
                            </button>
                        </div>

                        <div className="row-2">
                            <textarea className="form-control mb-2" 
                            value={module.description}
                            style={{width:"50%", border:"1px solid #d3d3d3", borderRadius: '5px'}}
                            onChange={(e) => 
                                dispatch(setModule({ ...module, description: e.target.value }))
                            }
                            />
                        </div>

                        <div className="row-2">
                            <textarea className="form-control mb-2" 
                            value={module.category}
                            style={{width:"50%", border:"1px solid #d3d3d3", borderRadius: '5px'}}
                            onChange={(e) => 
                                dispatch(setModule({ ...module, category: e.target.value }))
                            }
                            />
                        </div>

                        <div className="row-2">
                            <textarea className="form-control mb-2" 
                            value={module.category2}
                            style={{width:"50%", border:"1px solid #d3d3d3", borderRadius: '5px'}}
                            onChange={(e) => 
                                dispatch(setModule({ ...module, category2: e.target.value }))
                            }
                            />
                        </div>

                        <div className="row-2">
                            <textarea className="form-control mb-2" 
                            value={module.category3}
                            style={{width:"50%", border:"1px solid #d3d3d3", borderRadius: '5px'}}
                            onChange={(e) => 
                                dispatch(setModule({ ...module, category3: e.target.value }))
                            }
                            />
                        </div>
                        
                    </div>
                {/* </li>     */}
                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                    <li key={index} className="list-group-item">
                        {/* onClick={() => setSelectedModule(module)}> */}
                        

                        <div>
                            <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-2" />
                            <FaCaretDown className="me-2"/>
                            <span style={{fontWeight:"bold"}}>{module.name}</span>
                            <span className="float-end">
                                <FaCheckCircle className="text-success me-2" />
                                <FaPlus className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                            <button
                                className="btn btn-success float-end me-2"
                                style={{height:"25px", width:"40px", borderRadius: '5px'}}
                                onClick={() => dispatch(setModule(module))}>
                                Edit
                            </button>
                            <button
                                className="btn btn-danger float-end me-2"
                                style={{height:"25px", width:"50px", borderRadius: '5px'}}
                                onClick={() => handleDeleteModule(module._id)}>
                                Delete
                            </button>
                            
                        </div>
                        {/* {setModuleList === module._id && ( */}
                        <ul className="list-group">    
                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-3" />
                                {module.category}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            {module.lessons?.map((lesson: Lesson) => (        
                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-2" />
                                <span className="ms-4">{lesson.name}</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            ))} 

                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-3" />
                                {module.category2}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            {module.lessons2?.map((lesson: Lesson) => (        
                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-3" />
                                <span className="ms-4">{lesson.name}</span>
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            ))} 

                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-3" />
                                {module.category3}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            {module.lessons3?.map((lesson: Lesson) => (        
                            <li className="list-group-item">
                                <PiDotsSixVerticalBold style={{fontSize:"1.3em"}} className="me-2" />
                                <GrLink style={{color:"green"}} />
                                <Link to="#" className="ms-4" style={{textDecoration:"none", color:"crimson"}}>{lesson.name}</Link>
                                <FaArrowRightFromBracket className="ms-2" style={{color:"crimson"}} />
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                            ))} 
                        </ul>
                        {/* )}  */}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;