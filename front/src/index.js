import React from 'react';
import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App';
import Login from './routes/accounts/login'
import Register from './routes/accounts/register'

const rootElement = document.getElementById('root');
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
