import React, { Component } from 'react';

import Category from "./Category";

export default class Sidebar extends Component {

    state = {
        categories: []
    }

    componentDidMount = () => {
        //Populating sidebar with test data
        this.setState((prevState) => {
            for(let i = 1; i <= 5; ++i) {
                let elems = [];
                for(let j = 1; j <= i; ++j) elems.push("Element " + j.toString());
                let cat = <Category name={"Category " + i.toString()} elements={elems} />
                prevState.categories.push(cat)
            }
            
            return {state: prevState}
        });
    }

    render = () => {
        return (
            <div style={{background: '#c4c4c4', height: '100%', width: "20%", padding: '10px'}}>
                {this.state.categories.map((cat, index) => {
                    return <div key={index}>{cat}</div>;
                })}
            </div>
        )
    }
}