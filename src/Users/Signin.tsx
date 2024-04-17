import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div>
      <h1>Signin</h1>
      <input className="form-control w-25 mb-2" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input className="form-control w-25 mb-2" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })} type="password"/>
      <div>
        <button className="btn btn-primary" onClick={signin}> Sign in </button>
      </div>
      <Link to="/Kanbas/Account/signup" className="btn btn-danger mt-2">Sign up</Link>
    </div>
  );
}

