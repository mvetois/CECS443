import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Navbar from "./components/Navbar";
import Login from "./routes/accounts/login";
import Register from "./routes/accounts/register";


//import Account from "./pages/accounts/Account";

//import {Container} from "react-bootstrap";

//import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
