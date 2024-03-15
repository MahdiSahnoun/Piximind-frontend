import React from 'react';
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Signup from "./api/authentification/signup";
import Login from "./api/authentification/login";
import UserCrud from "./components/userCrud";
import Sidebar from "./components/sidebar/sidebar";
import {Overview} from "./components/sidebar/overview";
import {Home} from "./components/home";
import {Profile} from "./components/Profile";
import {Printer} from "./components/Printer/Printer";
import{Developpeur} from "./components/Printer/Developpeur";
import {AddPrinter} from "./components/Printer/AddPrinter";
function App() {
    return (
        <Container className="mb-4">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/overview" element={<Overview/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/printer" element={<Printer />} />
                <Route path="/add" element={<AddPrinter />} />
                <Route path="/developpeur" element={<Developpeur />}/>
                <Route path="/log-in" element={<Login />} />
                <Route path="/user" element={<UserCrud />} />
            </Routes>
        </Container>
    );
}

export default App;
