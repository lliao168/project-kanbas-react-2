import ModuleList from "./list";
import "./index.css";

function Modules({profile} : any) {
    return (
        <div>
            {/* <h2>Modules</h2> */}
            <ModuleList profile = {profile} />
        </div>
    );
}
export default Modules;