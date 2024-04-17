import Asd from "./Asd"
import Rew from "./Rew"
import {BrowserRouter, Link, Routes, Route}
from "react-router"
function App() {
return(
<BrowserRouter>
<Link to="/qwe/21/14/wer">LINK A</Link>
<Routes>
<Route path="/qwe/:qwe/:wer/wer"
element={<Rew/>}/>
<Route path="/asd/:zxc/:xcv"
element={<Asd/>}/>
</Routes>
</BrowserRouter>
)
}