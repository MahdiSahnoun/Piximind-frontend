import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Printer as PrinterInterface } from "../../api/Interface";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setPrinter } from "./printerSlice";
import { selectUser, selectToken } from "../../api/userSlice";
import { FaRegEdit } from "react-icons/fa";
import { IoNavigateOutline } from "react-icons/io5";

export function Printer() {
    const [printers, setPrinters] = useState<PrinterInterface[]>([]);
    const [editPrinter, setEditPrinter] = useState<PrinterInterface | null>(null);
    const [editUserId, setEditUserId] = useState<string>(""); // State to store the ID of the printer being edited
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get<PrinterInterface[]>("http://localhost:3000/printer");
            const printersData = response.data.filter(printer => printer.user === user._id);
            setPrinters(printersData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleAddPrinter = () => {
        navigate(`/add`);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/printer/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting printer:", error);
        }
    };

    const handleEdit = (printer: PrinterInterface) => {
        setEditPrinter(printer);
        setEditUserId(printer._id);
    };

    const handleCancelEdit = () => {
        setEditPrinter(null);
        setEditUserId("");
    };

    const handleUpdate = async (updatedPrinter: PrinterInterface) => {
        try {
            await axios.put(`http://localhost:3000/printer/${updatedPrinter._id}`, updatedPrinter, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEditPrinter(null);
            setEditUserId("");
            fetchData();
        } catch (error) {
            console.error("Error updating printer:", error);
        }
    };

    const handleSubmit = async (id: string) => {
        try {
            const response = await axios.get<PrinterInterface>(`http://localhost:3000/printer/${id}`);
            const printerData = response.data;
         //   console.log(printerData)
            dispatch(setPrinter(printerData));
        //    console.log(setPrinter)
            navigate("/developpeur");
        } catch (error) {
            console.error("Error setting printer:", error);
        }
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <Table striped bordered hover style={{ width: "110%", marginLeft: "7%" }}>
                <thead>
                <tr>
                    <th style={{ textAlign: "center", backgroundColor: "#3bb300", color: "white" }}>ID</th>
                    <th style={{ textAlign: "center", backgroundColor: "#3bb300", color: "white" }}>Name</th>
                    <th style={{ textAlign: "center", backgroundColor: "#3bb300", color: "white" }}>User</th>
                    <th style={{ textAlign: "center", backgroundColor: "#3bb300", color: "white" }}>User-url</th>
                    <th style={{ textAlign: "center", backgroundColor: "#3bb300", color: "white" }}>Action</th>
                    <th rowSpan={2} style={{textAlign: "center", backgroundColor: "#3bb300", color: "white"}}>Navigation</th>
                </tr>
                </thead>
                <tbody>
                {printers.map((printer) => (
                    <tr key={printer._id}>
                        <td style={{ textAlign: "center" }}>{printer._id}</td>
                        <td style={{ textAlign: "center" }}>{printer.name}</td>
                        <td style={{ textAlign: "center" }}>{printer.user}</td>
                        <td style={{ textAlign: "center" }}>{printer.url}</td>
                        <td style={{ textAlign: "center" }}>
                            <button onClick={() => handleEdit(printer)} style={{ color: "green", width: "50%" }}>
                                <FaRegEdit />
                            </button>
                            <button onClick={() => handleDelete(printer._id)} style={{ color: "red", width: "50%" }}>
                                <MdOutlineDeleteOutline />
                            </button>
                        </td>
                        <td
                            colSpan={2} style={{ textAlign: "center" }}>
                            <button onClick={() => handleSubmit(printer._id)} style={{ color: "blue", width: "50%" }}>
                                <IoNavigateOutline />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <button onClick={handleAddPrinter} style={{ display: "block", marginLeft: "45%", backgroundColor: "#3bb300", width: "30%", color: "white" }}> Add printer</button>
            {editPrinter && (
                <div style={{ textAlign: "center", marginLeft: "40%", padding: "20px", border: "2px solid #ccc", borderRadius: "5px", maxWidth: "500px" }}>
                    <input type="text" name="name" placeholder="Name" value={editPrinter.name} onChange={(e) => setEditPrinter({ ...editPrinter, name: e.target.value })} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <input type="text" name="url" placeholder="URL" value={editPrinter.url} onChange={(e) => setEditPrinter({ ...editPrinter, url: e.target.value })} style={{ marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    <Button onClick={() => handleUpdate(editPrinter)} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Save Changes</Button>
                    <br />
                    <br />
                    <Button onClick={handleCancelEdit} style={{ backgroundColor: "#3bb300", width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}>Cancel Edit</Button>
                </div>
            )}
        </div>
    );
}
