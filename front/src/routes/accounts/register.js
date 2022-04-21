import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "../../Backend";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    let nav = useNavigate();
    const handleRegister = (event) => {
        event.preventDefault();

        if(password != repeatPwd) {
            alert("Error: Passwords do not match");
            return;
        }

        register(email, password)
            .then(() => nav("/"))
            .catch((error) => alert(error));
    }

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
            <form onSubmit={handleRegister} style={{textAlign: "center"}}>
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
                <br />
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
                <br />
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
                <br />
                <button
                    className="appColor"
                    style={{
                        marginTop: 20,
                        width: 300,
                        borderRadius: 10,
                        height: 25,
                        lineHeight: 0
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;