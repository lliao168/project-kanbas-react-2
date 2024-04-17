import { Link, useLocation} from "react-router-dom";


function Nav() {
const { pathname } = useLocation();
 return (
   <nav className="nav nav-tabs mt-2">
     {/* <Link className="nav-link" to="/Labs/a3">
       A3</Link>
     <Link className="nav-link" to="/Labs/a4">
       A4</Link>
     <Link className="nav-link" to="/hello">
       Hello</Link>
     <Link className="nav-link" to="/Kanbas">
       Kanbas</Link> */}

       <Link className={`nav-link ${pathname.includes('hello')?"active" : ""}`} to="/hello">Hello World</Link>
        <Link className={`nav-link ${pathname.includes('/Labs/a3')?"active" : ""}`} to="/Labs/a3">A3</Link>
        <Link className={`nav-link ${pathname.includes('/Labs/a4')?"active" : ""}`} to="/Labs/a4">A4</Link>
        <Link className={`nav-link ${pathname.includes('/Labs/a5')?"active" : ""}`} to="/Labs/a5">A5</Link>
        <Link className={`nav-link ${pathname.includes('Kanbas')?"active" : ""}`} to="/Kanbas">Kanbas</Link>    
   </nav>
 );
}


export default Nav;

