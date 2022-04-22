import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');

    let nav = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();

        /*login(email, password)
            .then(() => nav("/"))
            .catch((error) => alert(error));

         */
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
            <h1>Update account information</h1>
            <form onSubmit={handleLogin} style={{textAlign: 'center'}}>
                <input
                    type="password"
                    style={{
                        width: '50vw',
                        paddingInline: '5px',
                        borderRadius: 10
                    }}
                    value={currentPwd}
                    onChange={e => setCurrentPwd(e.target.value)}
                    placeholder="Current Password"
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
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="New Password"
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
                    value={confirmNewPwd}
                    onChange={e => setConfirmNewPwd(e.target.value)}
                    placeholder="Confirm New Password"
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
                    Submit
                </button>
                <button
                    className="appColor"
                    onClick={() => {
                        setNewPassword('');
                        setConfirmNewPwd('');
                        setCurrentPwd('');
                    }}
                    style={{
                        marginTop: 20,
                        width: 300,
                        borderRadius: 10,
                        height: 25,
                        lineHeight: 0
                    }}
                >
                    Clear
                </button>
            </form>
        </div>
    );
}

export default UpdatePassword;