import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { selectUser,selectToken} from "../api/userSlice";
import piximind from "../images/font.png";
import {User} from "../api/Interface";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Profile: React.FC = () => {
    const user = useSelector(selectUser);
    const token=useSelector(selectToken)
    const userId= user._id
    const navigate = useNavigate();
    const [editUserId, setEditUserId] = useState<string>("");
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error:any) {
                toast.error(error.response.data.message)
            }
        };

        fetchUser();
    }, [userId]);


    const handleEdit = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
              //  'id':userId
            }
        };

        try {
            await axios.put(`http://localhost:3000/users/${userId}`, {
                name,
                email,
                password,
            }, config); // Include the config object as the third argument
            navigate('/overview');
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    };
    return (

        <div

           style={{
               backgroundImage: `url(${piximind})`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundPosition: '50% 50%',
               height: 'calc(95vh - 5rem)',
               width: '85vw',
               position: 'fixed',
               top: '5rem',
               left: '60%',
               transform: 'translate(-50%, 0%)',
               paddingRight: '10vw',
               zIndex: '-1',
            }}
        >

            <br/>

            <br/>
            <ToastContainer/>
            <div
                style={{
                    fontFamily: 'Arial, sans-serif',
                    maxWidth: '450px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: '40%',
                    position: 'relative',
                    top: '90px',
                    //transition: 'background-position 0.3s ease-in-out'
                }}
            >



            <h1 style={{ marginBottom: '20px' }}>Profile</h1>
                {userId && (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <button onClick={handleEdit} style={{ backgroundColor: '#3bb300', width: '100%', padding: '10px', borderRadius: '5px', border: 'none', color: 'white' }}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
}