import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import PrivateRoute from './routes/PrivateRoute';
import Home from "./routes/Home";
import Testing from "./routes/Testing";
import Login from "./routes/accounts/login";
import Register from "./routes/accounts/register";
import Navbar from "./components/Navbar";
import UpdatePassword from "./routes/UpdatePassword";
import DarkMode from "./components/DarkMode";

class App extends Component {
    render() {
        return (

            <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
                <DarkMode/>
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                        <Route path="*" element={<PrivateRoute component={
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/updatepassword" element={<UpdatePassword />} />
                                {/* Add other private paths here */}
                            </Routes>

                        }/>} />


                        {/* Paths here do not require login */}
                        <Route path="/testing" element={<Testing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgetpassword" element={<UpdatePassword />} />
                    </Routes>
                </BrowserRouter>

            </div>
        )
    }
}

export default App;
