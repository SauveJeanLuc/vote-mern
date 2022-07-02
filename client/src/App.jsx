import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import Login from "./pages/auth/LogIn";
// import Register from "./pages/auth/Register";
// import Admin from "./pages/dashboards/Admin";
// import Candidate from "./pages/dashboards/Candidates";



export default function App() {
    return (
        // <div>
                <Routes>
                    <Route exact path="/"  element={<Login/>}></Route>
                    <Route exact path="/login"  element={<Login/>}></Route>
                    <Route exact path="/register" element={<Register/>}></Route>
                    <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>

                // <Routes>
                //     <Route exact path="/"  element={<Login/>}></Route>
                //     <Route exact path="/login"  element={<Login/>}></Route>
                //     <Route exact path="/register" element={<Register/>}></Route>
                //     <Route exact path="/admin" element={<Admin/>}></Route>
                //     <Route exact path="/candidate" element={<Candidate/>}></Route>
                // </Routes>
            // {/* <span>Me Trying</span> */}
        // </div>
    );
}



