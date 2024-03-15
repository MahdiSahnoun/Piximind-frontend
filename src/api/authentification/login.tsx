import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../userSlice";
import { login } from "../authApi";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import piximind4 from '../../images/piximind4.png';
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from "react-toastify";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const token = await login(userData);
            dispatch(setToken(token));
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.id;
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const userDataFromServer = response.data;
            dispatch(setUser(userDataFromServer));
                navigate('/overview');
        } catch (error:any) {
            toast.error(error.response.data.message);
        }
    };
    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${piximind4})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0
            }}
        >
            <ToastContainer/>
            <div style={{ marginTop: "100px"}}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px", margin: "0 auto" }}>
                    <div className="justify-content-center">
                        <h5 style={{color:"#008000" ,textAlign:"center"}}>Welcome</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" style={{ color: "#008000", display: "block", textAlign: "center" }}>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" style={{ color: "#008000", display: "block", textAlign: "center" }}>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-3 d-grid">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                    style={{backgroundColor:"#008000"}}
                                >
                                    CONNECTER
                                </button>
                                <br/>
                                <button
                                    className="btn btn-primary btn-block"
                                    type="button"
                                    style={{backgroundColor:"#008000"}}
                                    onClick={handleSignUpClick}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-1 text-center">
                    <p>
                        © {new Date().getFullYear()} piximind. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger" /> by{" "}
                        <a href="https://www.piximind.com/en">piximind.pro</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;