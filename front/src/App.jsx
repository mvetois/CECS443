import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./routes/Home";
import Testing from "./routes/Testing";
import Login from "./routes/accounts/login";
import Register from "./routes/accounts/register";
import Navbar from "./components/Navbar";


//import Account from "./pages/accounts/Account";

//import {Container} from "react-bootstrap";

//import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Testing />} />
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default App;
