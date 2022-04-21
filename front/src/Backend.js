import { useNavigate } from "react-router-dom";

const expireTime = 7200000; //2 hours until user is automatically logged out

//Returns true if user is logged in, false otherwise
export const isLoggedIn = () => {
    try {
        if(getToken() == null) return false;
    }
    catch(error) {
        return false;
    }

    return true;
}

//Returns the access token if it is not expired, null otherwise
function getToken() {
	let token = JSON.parse(window.localStorage.getItem("token"));
	if(token == null)
		throw new Error("User is not logged in");
	
	//Token expired
	if(token.expires < Date.now()) {
		logout();
		throw new Error("User is not logged in");
	}

	//Update expire time every time the access token is used
	updateTokenExpire();
	
	return JSON.parse(window.localStorage.getItem("token")).token;
}

//Updates the token expire time
function updateTokenExpire() {
	let token = JSON.parse(window.localStorage.getItem("token")).token;
	window.localStorage.setItem("token", JSON.stringify({token: token, expires: Date.now() + expireTime}));
}

//Registers the user with the database using the given email and password
export const register = async (email, password) => {
    return fetch("http://127.0.0.1:5000/api/user/register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
		if(data.error != undefined) 
			throw new Error(data.error);
		else
			window.localStorage.setItem("token", JSON.stringify({token: data.token, expires: Date.now() + expireTime}));
    });
}

//Logs the user in with the provided email and password
export const login = async (email, password) => {
    return fetch("http://127.0.0.1:5000/api/user/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
		if(data.error != undefined) 
			throw new Error(data.error);
        else {
			window.localStorage.setItem("token", JSON.stringify({token: data.token, expires: Date.now() + expireTime}));
		}
    });
}

//Logs the user out
export const logout = async () => {
	window.localStorage.removeItem("token");
    document.location.reload();
}

//Returns the data in the given category and subcategory
export const getData = async (category, subcategory) => {
	let token = getToken();

    return fetch("http://127.0.0.1:5000/api/user/getdata?category=" + category + "&subcategory=" + subcategory, {
        headers: {
            "authorization": "Bearer " + token
        }
    })
	.then(response => response.json())
	.then(res => {
		if(res.error != undefined) 
			throw new Error(res.error);
		else 
			return res;
	});
}

//Upload data to a given category and subcategory using the provided information
export const addData = async (category, subcategory, name, desc, lang, data) => {
	let token = getToken();
    
    //Converting data to Base64
    let toBase64 = new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error)
    });    
    return toBase64.then((convertedFile) => {
        return fetch("http://127.0.0.1:5000/api/admin/data/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "category": category,
                "subcategory": subcategory,
                "data": {
                  "name": name,
                  "description": desc,
                  "lang": lang,
                  "data": convertedFile
                }
              })
        })
        .then(response => response.json())
        .then(data=>{
            if(data.error != undefined) 
                throw new Error(data.error);
        });
    })
    
}

//Delete data from a given category and subcategory
export const remData = async (category, subcategory, name) => {
	let token = getToken();

    return fetch("http://127.0.0.1:5000/api/admin/data/rem", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "category": category,
            "subcategory": subcategory,
            "name": name
        })
    })
    .then(response => response.json())
    .then(data=>{
		if(data.error != undefined) 
			throw new Error(data.error);
	});
}

//Returns all categories in the database
export const getCategories = async () => {
	let token = getToken();
	
	let categories = null;
    return fetch("http://127.0.0.1:5000/api/user/getcategories", {
        headers: {
            "authorization": "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(data => {
		if(data.error != undefined) 
			throw new Error(data.error);
        else
			return data;
    })
}

//Create a subcategory in a given category
export const addSubcat = async (category, subcategory) => {
	let token = getToken();

    return fetch("http://127.0.0.1:5000/api/admin/subcategory/add", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "category": category,
            "subcategory": subcategory
        })
    })
    .then(response => response.json())
    .then(data=>{
		if(data.error != undefined) 
			throw new Error(data.error);
	});
}

//Remove a subcategory from a given category
export const remSubcat = async (category, subcategory) => {
	let token = getToken();

    return fetch("http://127.0.0.1:5000/api/admin/subcategory/rem", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "category": category,
            "subcategory": subcategory
        })
    })
    .then(response => response.json())
    .then(data=>{
		if(data.error != undefined) 
			throw new Error(data.error);
	});
}
