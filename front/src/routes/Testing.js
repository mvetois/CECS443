import React from "react";
import { Button } from "react-bootstrap";
import AddDocument from "../components/AddDocument";
import Sidebar from "../components/Sidebar";

let token = null;

//Testing making requests
const reqTest = async () => {
    fetch('http://192.168.160.1:5000/api/user/getdata?category=testCI&subcategory=subcat1', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
    });
}

//Testing logging in
const loginTest = async () => {
    const data = {
        email: "testEmail",
        password: "testPassword2"
      };

    fetch('http://192.168.160.1:5000/api/user/login', {
        method: 'POST', // or 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            token = data.token;
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//Pinging the api
const test = async () => {
    console.log(await fetch("http://127.0.0.1:5000/api/", {method: "GET"}));
}

const Testing = () => {
    return <div style={{height: '100%', display: 'flex'}}>
        <Sidebar />
        <div>
            <AddDocument />
            <Button onClick={test}>test</Button>
            <Button variant="success" onClick={loginTest}>login</Button>
            <Button variant="info" onClick={reqTest}>request</Button>
        </div>
    </div>
}

export default Testing;
