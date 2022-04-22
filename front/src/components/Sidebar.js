import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Sidebar extends Component {

    state = {
        showSubs: []
    }

    handleCategorySelect = (index) => {
        console.log(index, this.state.showSubs);
        //Initialize array of showSubs if it's not already initialized
        if(!("showSubs" in this.state)) {
            let categories = this.props.getCategories();
            let temp = Array(categories.length).fill(false);
            temp[index] = !temp[index];
            if(categories !== null) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        showSubs: temp
                    }
                });
            }
        }
        else {
            this.setState((prevState) => {
                prevState.showSubs[index] = !prevState.showSubs[index];
                return {
                    ...prevState, 
                    showSubs: prevState.showSubs
                };
            });
        }
    }

    render = () => {
        let categories = this.props.getCategories()

        return (
            <div style={{background: '#c4c4c4', height: '100%', width: "20%", padding: '10px'}}>
                {categories ? categories.map((cat, index) => {
                    return (
                        <div key={index}>
                            <Button onClick={() => this.handleCategorySelect(index)} 
                                style={{
                                    width: "100%",
                                    textAlign: "left",
                                    color: "black",
                                    backgroundColor: "transparent", 
                                    borderColor: "transparent",
                                    boxShadow: "none",
                                    padding: "0px"
                                }}>
                                <div style={{display: "inline-flex", width: "100%"}}>
                                    <h4 style={{marginBottom: "0px", marginTop: "5px", width: "100%"}} >{cat.name}</h4>
                                    <h6 style={{margin: "auto"}}>{this.state.showSubs[index] ? "\u25b2" : "\u25bc"}</h6>
                                </div>
                            </Button>
                            {this.state && this.state.showSubs[index] ? cat.subcategories.map((subcat, index) => {
                                return <div key={index} style={{paddingLeft: '10px'}}>{subcat.name}<br /></div>
                            }) : ""}
                        </div>
                    )
                }) : ""}
            </div>
        )
    }
}