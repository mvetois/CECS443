import VectorIcon from '../assets/Vector.png';
import { useNavigate } from 'react-router-dom';
import NavBarDropDown from './NavBarDropDown';
const Navbar = () => {
    const navigate = useNavigate();
    const options = [{
      label: "Login",
      onClick: () => { navigate('/'); }
    }, {
        label: "Register",
        onClick: () => { navigate('/register'); }
    }]
    return (
        <div
            style={{
                backgroundColor: "rgb(173, 216, 230)",
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between',
                height: 80
            }}>
            <img src={VectorIcon} width="150" />
            <NavBarDropDown options={options} />
        </div>
    );
}

export default Navbar;