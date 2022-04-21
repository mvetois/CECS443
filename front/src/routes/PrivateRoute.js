import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../Backend';

const PrivateRoute = (props) => {
	let nav = useNavigate()
	useEffect(() => {
		if (!isLoggedIn()) 
			nav("/login");
	});
	
	return props.component;
}

export default PrivateRoute;