import React from "react";
import { getCategories } from "../Backend";
import Sidebar from "../components/Sidebar";


export default class Home extends React.Component {
    componentDidMount = async () => {
        const urlParams = new URLSearchParams(document.location.search);
        for(let entry of urlParams.entries())
            console.log(entry);

        let tempCat = urlParams.get("category"), tempSubcat = urlParams.get("subcategory");

        let categories = await getCategories().catch((error) => {
            alert.error(error);
            return null;
        })
        this.setState({
            categories: categories,
            selected: {
                category: (tempCat !== null ? tempCat : -1),
                subcategory: (tempSubcat !== null ? tempSubcat : -1)
            }
        })
    }

    getCats = () => this.state ? this.state.categories : null;

    getSelected = () => this.state ? {
        category: parseInt(this.state.selected.category), 
        subcategory: parseInt(this.state.selected.subcategory)
    } : null;
    setSelected = (category, subcategory) => {
        //Setting URL search parameters
        const url = new URL(document.location);
        if(category >= 0) url.searchParams.set("category", category);
        else url.searchParams.delete("category");
        if(subcategory >= 0) url.searchParams.set("subcategory", subcategory);
        else url.searchParams.delete("subcategory");
        
        window.history.pushState(null, '', url.toString());

        this.setState((prevState) => {
            return {
                ...prevState,
                selected: {
                    category: category,
                    subcategory: subcategory
                }
            }
        })
    }

    render() {
        let category = (this.state && this.state.selected.category >= 0 ? 
            this.state.categories[this.state.selected.category]
            : null);

        return (
            <div style={{height: '100%', display: 'flex', overflow: "hidden"}}>
                <Sidebar getCategories={this.getCats} getSelected={this.getSelected} setSelected={this.setSelected}/>
                <div style={{
                        width: "100%",
                        height: "100%",
                        padding: "10px",
                        textAlign: "center"
                    }}>
                    <h2>{category ? category.name : ""}</h2>
                </div>
            </div>
        )
    }
}

