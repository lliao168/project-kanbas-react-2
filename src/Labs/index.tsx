import Nav from "../Nav";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import {Routes, Route, Navigate}
  from "react-router";
import store from "./store";
import { Provider } from "react-redux";
import Assignment5 from "./a5";

function Labs() {
 return (
    <Provider store={store}>

        <div className="container-fluid">
            {/* <h1>Labs</h1> */}
            <Nav/>
            <Routes>
            <Route path="/"
                element={<Navigate
                        to="a5"/>}/>
            <Route path="a3"
                element={<Assignment3/>}/>
            <Route path="a4"
                element={<Assignment4/>}/>
            <Route path="a5"
                element={<Assignment5/>}/>    
            </Routes>
            {/* <Assignment3/>
            <Assignment4/> */}
        </div>
    </Provider>    
 );
}
export default Labs;

