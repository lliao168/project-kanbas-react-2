import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill, BsFillCheckCircleFill, BsPencil} from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";
export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER" });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user: User) => {
    if (!user._id) {
      console.error("User ID is undefined, cannot delete:", user);
      return;
    }
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) =>
        (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const [role, setRole] = useState("USER");
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-control w-25 float-end"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>  
      <h1>User Table</h1>
      <table className="table">
        <thead>
        <tr> 
            {/* <td>
            <span style={{fontWeight:"bold"}}>ID</span>
            </td> */}
            <td>
                <span style={{fontWeight:"bold"}}>Username</span>
            </td>
            <td>
            </td>
            <td>
            <span style={{fontWeight:"bold"}}>First Name</span>
            </td>
            <td>
            <span style={{fontWeight:"bold"}}>Last Name</span>
            </td>
            <td>
            <span style={{fontWeight:"bold"}}>Role</span>
            </td>
        </tr>
          <tr>
            {/* <td>
            <input className="form-control" value={user._id} onChange={(e) =>
                setUser({ ...user, _id: e.target.value })}/>
            </td> */}
            <td>
              <input className="form-control" value={user.username} onChange={(e) =>
                setUser({ ...user, username: e.target.value })}/>
              
            </td>

            <td>
                <input className="form-control" value={user.password} onChange={(e) =>
                    setUser({ ...user, password: e.target.value })} type="password" />
            </td>

            <td>
              <input className="form-control" value={user.firstName} onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input className="form-control" value={user.lastName} onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select className="form-control" value={user.role} onChange={(e) =>
                setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td className="text-nowrap">
            <BsFillCheckCircleFill
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
            />
  
              <BsPlusCircleFill 
              onClick={createUser}
              className="text-success fs-1 text"/>
            </td>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              {/* <td>{user._id}</td> */}
              <td>{user.username}</td>
              <td></td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              
              <td>
                <button className="btn btn-danger me-2"
                    onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

