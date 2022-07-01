import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


export default function App() {
    return (
        // <div>
                <Routes>
                    <Route exact path="/"  element={<Login/>}></Route>
                    <Route exact path="/login"  element={<Login/>}></Route>
                    <Route exact path="/register" element={<Register/>}></Route>
                    <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
            // {/* <span>Me Trying</span> */}
        // </div>
    );
}



