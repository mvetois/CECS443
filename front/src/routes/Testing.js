import React from "react";
import AddDocument from "../components/AddDocument";
import Sidebar from "../components/Sidebar";

const Testing = () => {
    return <div style={{height: '100%', display: 'flex'}}>
        <Sidebar />
        <div>
            <AddDocument />
        </div>
    </div>
}

export default Testing;
