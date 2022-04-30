import React from 'react';
import VectorIcon from '../assets/Vector.png';
import VectorIcon1 from '../assets/Vector1.png';
import moon from '../assets/moon.png';
import { useNavigate } from 'react-router-dom';
import NavBarDropDown from './NavBarDropDown';
import ThemeToggle from './ThemeToggle';
import { isLoggedIn, logout } from '../Backend';

const Navbar = () => {
    const navigate = useNavigate();

    let options;
    if(isLoggedIn()) {
        options = [{
            label: "Update password",
            onClick: () => { navigate('/updatepassword'); }
        }, {
            label: "Logout",
            onClick: () => { logout().catch((error)=>alert(error)); navigate('/login'); }
        }];
    }
    else {
        options = [{
            label: "Login",
            onClick: () => { navigate('/login'); }
        }, {
            label: "Register",
            onClick: () => { navigate('/register'); }
        }]
    }

    const goHome = () => { 
        //Reload page if we're already at "/"
        if(document.location.pathname === "/") {
            navigate("/");
            navigate(0);
        }
        else navigate("/"); //Do not reload if we're on a different path because it causes an error with fetch
    }

    return (
        <div
            className="appColor"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between'
            }}>
            <div onClick={goHome} 
                style={{
                    display: "flex", 
                    flexDirection: "column", 
                    cursor: "pointer",
                    marginTop: "21px",
                    marginLeft: "18px",
                    marginBottom: "11px"
                }}>
                <img src={VectorIcon} width="110" style={{marginBottom: "9.17px"}}/>
                <img src={VectorIcon1} width="110" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div id="google_translate_element"></div>
                <NavBarDropDown options={options} />
                <img src={moon} width="25" />


            </div>

        </div>
    );
}

export default Navbar;