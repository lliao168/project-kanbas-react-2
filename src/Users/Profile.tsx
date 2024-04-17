import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    const formattedDob = account.dob ? new Date(account.dob).toISOString().split('T')[0] : '';
    const updatedAccount = { ...account, dob: formattedDob };
    setProfile(updatedAccount);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const save = async () => {
    await client.updateUser(profile);
  };
  return (
    <div>
      <div className="d-flex justify-content-between mb-2">  
        <h1>Profile</h1>
      </div>  
      {profile && (
        <div>
          <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100 mb-2">
                Users
          </Link>
          <input className="form-control w-100 mb-2" value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
          <input className="form-control w-100 mb-2" value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })} type="password"/>
          <input className="form-control w-100 mb-2" value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
          <input className="form-control w-100 mb-2" value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
          <input type="date" className="form-control w-100 mb-2" value={profile.dob} onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
          <input className="form-control w-100 mb-2" value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
          <select className="form-control w-100 mb-2" value={profile.role} onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <div>  
            <button className="btn btn-primary mb-2" onClick={save}>
                    Save
            </button>
          </div>
          <button className="btn btn-danger" onClick={signout}>
            Signout
          </button>


        </div>
      )}
    </div>
  );
}

