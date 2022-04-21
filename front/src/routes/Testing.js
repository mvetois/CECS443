import React from "react";
import { Button } from "react-bootstrap";
import AddDocument from "../components/AddDocument";
import Sidebar from "../components/Sidebar";
import { register as test1, login as test2, logout as test3, getData as test4, addData as test5, remData as test6,
        getCategories as test7, addSubcat as test8, remSubcat as test9, isLoggedIn} from "../Backend";

let token = null;

//Testing deleting data
const remData = async () => {
    test6("testCI", "subcat1", "data1");
}

//Testing uploading data
const addData = async () => {
    test5("testCI", "subcat1", "data1", "data1 desc", "EN", "test data");
}

//Testing remove a subcategory
const remSubcat = async () => {
    test9("testCI", "subcat1");
}

//Testing creating subcategory
const addSubcat = async () => {
    test8("testCI", "subcat1");
}

const getCategories = async () => {
    console.log(await test7());
}

//Testing making requests for data
const getData = async () => {
    console.log(await test4("testCI", "subcat1"));
}

//Testing logging out
const logout = async () => {
    test3();
}

//Testing logging in
const login = async () => {
    test2("testEmail", "testPassword2");
}

const register = async () => {
    test1("testEmail5", "testPassword3");
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
            <Button variant="secondary" onClick={ping}>Ping</Button>
            <Button variant="primary" onClick={register}>Register</Button>
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
