import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Sidebar extends Component {

    state = {
        showSubs: []
    }

    componentDidMount = () => {
        //Initializing selected from url parameters
        let urlParams = new URLSearchParams(document.location.search);
        let category = urlParams.get("category");
        if(category >= 0) this.toggleShow(category);
    }

    toggleShow = (index) => {
        //Handling the dropdown to show subcategories
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

    handleCategorySelect = (index) => {
        //Setting the selected category in parent component
        this.props.setSelected(index, -1);

        //Showing the selected category's subcategories
        this.toggleShow(index);
    }

    handleSubcategorySelect = (catIndex, subcatIndex) => {
        //Setting the selected subcategory in parent component
        this.props.setSelected(catIndex, subcatIndex);
    }

    render = () => {
        let categories = this.props.getCategories()
        let selected = this.props.getSelected();

        return (
            <div 
                style={{
                    background: '#c4c4c4', 
                    height: '100%', 
                    width: "20%", 
                    minWidth: "180px",
                    padding: '10px', 
                    overflowY: "auto"
                }}>
                {categories ? categories.map((cat, index) => { //For each category, make a dropdown for its subcategories
                    return (
                        <div key={index}>
                            <Button onClick={() => this.handleCategorySelect(index)} 
                                style={{
                                    width: "100%",
                                    textAlign: "left",
                                    color: "black",
                                    backgroundColor: (index === selected.category ? "#a6a6a6" : "transparent"), 
                                    borderColor: "transparent",
                                    boxShadow: "none",
                                    padding: "0px"
                                }}>
                                <div style={{display: "inline-flex", width: "100%"}}>
                                    <h4 style={{marginBottom: "0px", marginTop: "5px", width: "100%"}} >{cat.name}</h4>
                                    <h6 style={{margin: "auto"}}>{this.state.showSubs[index] ? "\u25b2" : "\u25bc"}</h6>
                                </div>
                            </Button>
                            {this.state && this.state.showSubs[index] ? cat.subcategories.map((subcat, subcatIndex) => { //For each subcategory
                                return <Button key={subcatIndex} onClick={() => this.handleSubcategorySelect(index, subcatIndex)} 
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        color: "black",
                                        backgroundColor: (index === selected.category && subcatIndex === selected.subcategory ? "#a6a6a6" : "transparent"), 
                                        borderColor: "transparent",
                                        boxShadow: "none",
                                        padding: "0px",
                                        paddingLeft: "10px"
                                    }}>
                                    {subcat.name}
                                </Button>
                            }) : "" /*End subcategories*/}
                            <br />
                        </div>
                    )
                }) : "" /*End categories*/}
            </div>
        )
    }
}