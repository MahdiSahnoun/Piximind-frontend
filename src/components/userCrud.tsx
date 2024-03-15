import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "../api/userSlice";
import { User } from "../api/Interface";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from "react-toastify";


const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showNewUser, setShowNewUser] = useState(false);

    const [newUser, setNewUser] = useState<User>({ _id: "", name: "", email: "", password: "", role: "" });
    const [editUserId, setEditUserId] = useState<string>("");
    const token = useSelector(selectToken);


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get<User[]>("http://localhost:3000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            toast.error("unauthorized person")
        }
    };
  //  const [permession, setPermission] = useState(true);

    const addUser = async () => {
        try {
            const response = await axios.post<User>("http://localhost:3000/users", newUser, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers([...users, response.data]);
            setShowNewUser(false);
        } catch (error: any) {
          //  if (error.response && error.response.status === 403) {
              //  setPermission(false);
            toast.error(error.response.data.message)

            // } else {
            //    toast.error("Unauthorized person");
         //   }
        }
    };


    const editUser = async (userId: string) => {
        try {
            const response = await axios.get<User>(`http://localhost:3000/users/${userId}`);
            const userData = response.data;
            console.log(userData)
            setEditUserId(userId);
            setNewUser(userData);
        }  catch (error:any) {
            toast.error(error.response.data.message)
        }
    };

    const handleEdit = async () => {

        try {
            await axios.put(`http://localhost:3000/users/${editUserId}`, newUser, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getUsers();
            setEditUserId("");
            setNewUser({ _id: "", name: "", email: "", password: "", role: "" });

        } catch (error:any) {

            toast.error(error.response.data.message)
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };
    const handleCancelEdit = () => {
        setEditUserId("");
        setNewUser({ _id: "", name: "", email: "", password: "", role: "",  });    };
    const handleCancelAdd = () => {
        setNewUser({ _id: "", name: "", email: "", password: "", role: "",  });        setShowNewUser(false);
    };

    return (
        <div>

            <br/>
            <ToastContainer/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Table striped bordered hover style={{width: "110%", marginLeft: "7%"}}>
                <thead >
                <tr>
                    <th style={{textAlign:"center",backgroundColor: "#3bb300",color:"white"}}>ID</th>
                    <th style={{textAlign:"center",backgroundColor: "#3bb300",color:"white"}}>Name</th>
                    <th style={{textAlign:"center",backgroundColor: "#3bb300",color:"white"}}>Email</th>
                    <th style={{textAlign:"center",backgroundColor: "#3bb300",color:"white"}}>Role</th>
                    <th style={{textAlign:"center",backgroundColor: "#3bb300",color:"white"}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td style={{textAlign:"center"}}>{user._id}</td>
                        <td style={{textAlign:"center"}}>{user.name}</td>
                        <td style={{textAlign:"center"}}>{user.email}</td>
                        <td style={{textAlign:"center" }}>{user.role}</td>
                        <td style={{textAlign:"center"}}>
                            <button  onClick={() => editUser(user._id)} style={{color:"green" ,width:"50%"}}>
                                <FaRegEdit />
                            </button>

                            <button  onClick={() => deleteUser(user._id)}style={{color:"red" ,width:"50%"}}>
                                <MdOutlineDeleteOutline />
                            </button>


                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {/*{permession?(
            <Button onClick={() => setShowNewUser(!showNewUser)} style={{ display: "block", marginLeft: "45%", backgroundColor: " #3bb300", width:"30%"  }}>{showNewUser ? "Hide Add User" : "Add User"}</Button>
                ):(
                <Button disabled onClick={() => setShowNewUser(!showNewUser)} style={{ display: "block", marginLeft: "45%", backgroundColor: " #3bb300", width:"30%"  }}>{showNewUser ? "Hide Add User" : "Add User"}</Button>
            )}*/}
            <Button onClick={() => setShowNewUser(!showNewUser)} style={{ display: "block", marginLeft: "45%", backgroundColor: " #3bb300", width:"30%"  }}>{showNewUser ? "Hide Add User" : "Add User"}</Button>
            <br/>
            {editUserId && (
                <div style={{ textAlign: "center", marginLeft: "40%", padding: "20px", border: "2px solid #ccc", borderRadius: "5px", maxWidth: "500px",}}>
                    <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/>
                    <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/>
                    <select id="role" name="role" value={newUser.role} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} >
                        <option value="" disabled selected>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                    </select>
                    <Button onClick={handleEdit} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Save Changes</Button>
                    <br/>
                    <br/>
                    <Button onClick={handleCancelEdit} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Cancel Edit</Button>
                </div>
            )}
<br/>
            {showNewUser && (
                <div style={{ textAlign: "center", marginLeft: "40%", padding: "20px", border: "2px solid #ccc", borderRadius: "5px", maxWidth: "500px",}}>
                    <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <select id="role" name="role" value={newUser.role} onChange={handleChange} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
                        <option value="" disabled selected>Select Role</option>
                       <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                    </select>
                    <br />
                    <Button onClick={addUser} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Add</Button>
                    <br />
                    <br />
                    <Button onClick={handleCancelAdd} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Cancel</Button>
                </div>

            )}
        </div>
    );
};

export default Users;
