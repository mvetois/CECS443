import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../Backend';

const UpdatePassword = () => {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPwd, setConfirmNewPwd] = useState('');

    let nav = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();

        if(newPassword !== confirmNewPwd) alert("New password must match");
        else 
            updatePassword(currentPwd, newPassword)
                .catch((error) => {
                    if(error.message === "User not found") alert("Current password incorrect");
                    else alert(error);
                });
            alert("Password has been updated");
            nav("/");
        
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
            </form>
        </div>
    );
}

export default UpdatePassword;