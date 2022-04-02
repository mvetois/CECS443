import React from "react";
import {Button, Card, Form} from "react-bootstrap";
import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Register</h1>
            <input
                type="text"
                style={{
                    width: '50vw',
                    paddingInline: '5px',
                    borderRadius: 10
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                style={{
                    width: '50vw',
                    paddingInline: '5px',
                    marginTop: 25,
                    borderRadius: 10
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                style={{
                    width: '50vw',
                    paddingInline: '5px',
                    marginTop: 25,
                    borderRadius: 10
                }}
                value={repeatPwd}
                onChange={e => setRepeatPwd(e.target.value)}
                placeholder="Confirm password"
            />
            <button
                onClick={() => {}}
                style={{
                    marginTop: 20,
                    width: 300,
                    borderRadius: 10,
                    height: 25,
                    backgroundColor: '#ADD8E6'
                }}
            >
                Register
            </button>
        </div>
    );
}

export default Register;