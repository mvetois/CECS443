import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../../Backend";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let nav = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        
        login(email, password)
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
        <h1>Log in</h1>
        <form onSubmit={handleLogin} style={{textAlign: 'center'}}>
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
            <button
                className="appColor"
                type="submit"
                style={{
                    marginTop: 20,
                    width: 300,
                    borderRadius: 10,
                    height: 25,
                    lineHeight: 0
                }}
            >
                Log in
            </button>
        </form>
      </div>
    );
}

export default Login;