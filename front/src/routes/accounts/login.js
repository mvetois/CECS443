import {Button, Card, Form, Nav} from "react-bootstrap";
import { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <input
                type="text"
                style={{
                    width: '50vw',
                    borderRadius: 10
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
            />
          <input
              type="text"
              style={{
                  width: '50vw',
                  marginTop: 25,
                  borderRadius: 10
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
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
              Log in
          </button>
      </div>
    );
}

export default Login;