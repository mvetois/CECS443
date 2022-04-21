import React from 'react';
import VectorIcon from '../assets/Vector.png';
import VectorIcon1 from '../assets/Vector1.png';
import { useNavigate } from 'react-router-dom';
import NavBarDropDown from './NavBarDropDown';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
    const navigate = useNavigate();
    const options = [{
      label: "Login",
      onClick: () => { navigate('/login'); }
    }, {
        label: "Register",
        onClick: () => { navigate('/register'); }
    }, {
        label: "Testing",
        onClick: () => { navigate('/testing'); }
    }]
    return (
        <div
            className="appColor"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between',
                height: 80
            }}>
            <img src={VectorIcon} width="150" />
            <img src={VectorIcon1} width="150" />
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <NavBarDropDown options={options} />
                <ThemeToggle colorOne="black" colorTwo="white" />
            </div>

        </div>
    );
}

export default Navbar;