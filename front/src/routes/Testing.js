import React from "react";
import { Button } from "react-bootstrap";
import AddDocument from "../components/AddDocument";
import Sidebar from "../components/Sidebar";

//Testing deleting data
const remData = async () => {
    fetch("http://127.0.0.1:5000/api/admin/data/rem", {
        credentials: "include",
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": "testCI",
            "subcategory": "subcat1",
            "name": "data1"
        })
    })
    .then(data=>console.log(data));
}

//Testing uploading data
const addData = async () => {
    fetch("http://127.0.0.1:5000/api/admin/data/add", {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": "testCI",
            "subcategory": "subcat1",
            "data": {
              "name": "data1",
              "description": "data1 desc",
              "lang": "EN",
              "data": "test data"
            }
          })
    })
    .then(data=>console.log(data));
}

//Testing remove a subcategory
const remSubcat = async () => {
    fetch("http://127.0.0.1:5000/api/admin/subcategory/rem", {
        credentials: "include",
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": "testCI",
            "subcategory": "subcat1"
        })
    })
    .then(data=>console.log(data));
}

//Testing creating subcategory
const addSubcat = async () => {
    fetch("http://127.0.0.1:5000/api/admin/subcategory/add", {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": "testCI",
            "subcategory": "subcat1"
        })
    })
    .then(data=>console.log(data))
    .catch((error) => {
        console.error("Error:", error);
    });
}

const getCategories = async () => {
    fetch("http://127.0.0.1:5000/api/user/getcategories", {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

//Testing making requests for data
const getData = async () => {
    fetch("http://127.0.0.1:5000/api/user/getdata?category=testCI&subcategory=subcat1", {credentials: "include"})
        .then(response => response.json())
        .then(data => {
        console.log("Success:", data);
        })
        .catch((error) => {
        console.error("Error:", error);
    });
}

//Testing logging out
const logout = async () => {
    fetch("http://127.0.0.1:5000/api/user/logout", {
        credentials: "include",
        method: 'POST'  
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

//Testing logging in
const login = async () => {
    fetch("http://127.0.0.1:5000/api/user/login", {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "testEmail",
            password: "testPassword2"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

//Pinging the api
const ping = async () => {
    console.log(await fetch("http://127.0.0.1:5000/api/", {method: "GET"}));
}

const Testing = () => {
    return <div style={{height: '100%', display: 'flex'}}>
        <Sidebar />
        <div>
            <AddDocument />
            <Button onClick={ping}>Ping</Button>
            <Button variant="success" onClick={login}>Login</Button>
            <Button variant="danger" onClick={logout}>Logout</Button>
            <br />
            <Button variant="dark" onClick={getCategories}>Get categories</Button>
            <Button variant="success" onClick={addSubcat}>Add subcategory</Button>
            <Button variant="danger" onClick={remSubcat}>Delete subcategory</Button>
            <br />
            <Button variant="info" onClick={getData}>Get data</Button>
            <Button variant="success" onClick={addData}>Add data</Button>
            <Button variant="danger" onClick={remData}>Delete data</Button>
        </div>
    </div>
}

export default Testing;
