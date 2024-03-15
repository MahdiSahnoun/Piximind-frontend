import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectToken, setUser } from "../../api/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Printer } from "../../api/Interface";
import axios from "axios";

export const AddPrinter: React.FC = () => {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const dispatch = useDispatch(); // Initialize useDispatch
    const navigate = useNavigate();
    const [printer, setPrinter] = useState<Printer>({
        _id: "",
        name: "",
        apiKey: "",
        user: "",
        url:"",
    });

    const handleSiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrinter({ ...printer, url: e.target.value });
    };

    const addPrinter = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/printer", { name: printer.name, url: printer.url }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Printer added:", response.data);
            navigate("/printer");
        } catch (error) {
            console.error("Error adding printer:", error);
        }
    };

    return (
        <div>
            <br />
            <br />
            <ToastContainer />
            <div
                style={{
                    fontFamily: "Arial, sans-serif",
                    maxWidth: "450px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "40%",
                    position: "relative",
                    top: "90px",
                }}
            >
                <h1 style={{ marginBottom: "20px" }}>Profile</h1>
                <form onSubmit={addPrinter}>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "5px",
                            }}
                        >
                            Printer Name
                        </label>
                        <input
                            type="text"
                            value={printer.name}
                            onChange={(e) => setPrinter({ ...printer, name: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "3px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "5px",
                            }}
                        >
                            Site
                        </label>
                        <input
                            type="text"
                            value={printer.url}
                            onChange={handleSiteChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "3px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <button type="submit">Add Printer</button>
                </form>
            </div>
        </div>
    );
};
