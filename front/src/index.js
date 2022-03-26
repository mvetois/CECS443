import React from 'react';
import { render } from "react-dom"

import './index.css';
import App from './App';
import Login from './routes/accounts/login'
import Register from './routes/accounts/register'

const rootElement = document.getElementById('root');
render(<App/>,rootElement);
