import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import {HashRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Signin from './Users/Signin';
import Signup from './Users/Signup';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Signin"/>}/>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Labs/*" element={<Labs/>}/>
          <Route path="/Kanbas/*" element={<Kanbas/>}/>
          <Route path="/hello" element={<HelloWorld />} />
        </Routes>  
      </div>
    </HashRouter>  
    
    // <HashRouter>
      // <div>
      //   <Routes>
      //     <Route path="/" element={<Navigate to="/Labs/a3" />} />
      //     <Route path="/Labs/*" element={<Labs/>}/>
      //     <Route path="/Kanbas/*" element={<Kanbas/>}/>
      //     <Route path="/hello" element={<HelloWorld />} />
      //   </Routes>  
      // </div>
    // </HashRouter>
  );
}

export default App;
