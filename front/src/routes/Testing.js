import React from "react";
import { Button } from "react-bootstrap";
import AddDocument from "../components/AddDocument";
import { register as test1, login as test2, logout as test3, getData as test4, addData as test5, remData as test6,
        getCategories as test7, addSubcat as test8, remSubcat as test9, isLoggedIn, updatePassword as test10, isAdmin } from "../Backend";

//Testing deleting data
const remData = async () => {
    console.log(await test6("testCI", "subcat1", "data1"));
}

//Testing uploading data
const addData = async () => {
    //Adding a txt file that just says "test"
    console.log(await test5("testCI", "subcat1", "data1", "data1 desc", "EN", "test"));
}

//Testing remove a subcategory
const remSubcat = async () => {
    console.log(await test9("testCI", "subcat1"));
}

//Testing creating subcategory
const addSubcat = async () => {
    console.log(await test8("testCI", "subcat1"));
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
    console.log(await test3());
}

//Testing logging in
const login = async () => {
    console.log(await test2("testEmail", "test"));
    document.location.reload();
}

//Testing register
const register = async () => {
    console.log(await test1("testEmail6", "test"));
}

//Testing updating email
const updatePassword = async () => {
    console.log(await test10("testEmail", "test", "test"));
}

//Pinging the api
const ping = async () => {
    console.log(await fetch("http://127.0.0.1:5000/api/", {method: "GET"}));
}

const download = async () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = (await test4("testCI", "subcat1")).data[0].data;
    downloadLink.download = "testdownload";
    downloadLink.click();
}

const urlParameters = () => {
    const urlParams = new URLSearchParams(document.location.search);
    for(let entry of urlParams.entries()) 
        console.log(entry);
}

const spaceTest = async () => {
    for(let i = 0; i < 10; ++i)
        await test8("cat1", "subcat" + i.toString()).catch((error)=>console.error(error));
}

const Testing = () => {
    return <div style={{height: '100%', display: 'flex', padding: "10px"}}>
        <div>
            <h4>Many of these buttons have broken as the app has been developed</h4>
            <br />
            <AddDocument />
            {isLoggedIn() ? "logged in" : "logged out"}
            <br />
            Admin? {isAdmin() ? "true" : "false"}
            <br />
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
            <br />
            <Button onClick={download}>Download</Button>
            <br />
            <Button style={{backgroundColor: "purple", borderColor: "purple"}} onClick={updatePassword}>Update password</Button>
            <br />
            <Button variant="success" onClick={urlParameters}>URL</Button>
            <br />
            <Button variant="secondary" onClick={spaceTest}>Space test</Button>
        </div>
    </div>
}

export default Testing;
