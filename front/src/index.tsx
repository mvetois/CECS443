import React from 'react';
import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App.tsx';
import Test1 from './routes/test1'

const rootElement = document.getElementById('root');
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/test1" element={<Test1 />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
