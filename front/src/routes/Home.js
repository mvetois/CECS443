import React from "react";
import { addCategory, addSubcat, getCategories } from "../Backend";
import CategoryView from "../components/CategoryView";
import Sidebar from "../components/Sidebar";
import SubcategoryView from "../components/SubcategoryView";

//Home page showing the file system and allowing the user to traverse it
export default class Home extends React.Component {
    componentDidMount = async () => {
        const urlParams = new URLSearchParams(document.location.search);

        //Setting up page to accurately represent what's shown in the URL search parameters
        let tempCat = urlParams.get("category"), tempSubcat = urlParams.get("subcategory");
        tempCat = (tempCat !== null ? tempCat : -1);
        tempSubcat = (tempSubcat !== null ? tempSubcat : -1);
        
        //Getting the categories from the database
        let categories = await getCategories().catch((error) => {
            alert(error);
            return null;
        });
        this.setState({
            categories: categories
        }, () => this.setSelected(tempCat, tempSubcat));
    }

    //Updates the view to include new data and switch to different views if there's been a new selection
    updateView = () => {
        //Default view shows all categories
        let view = <CategoryView getCategories={this.getCats} setSelected={this.setSelected} addCategory={this.addCategory} />

        if(this.state.selected.category >= 0) {
            if(this.state.selected.subcategory >= 0) { //If we have a subcategory selected, show all documents in that subcategory
                view = <h2>Temp documents view</h2>
                //view = <DocumentsView subcategory={
            }
            else { //If we just have a category selected, we show the subcategories within
                let selectedCategory = this.state && this.state.categories.length > this.state.selected.category ? this.state.categories[this.state.selected.category] : null;
                view = <SubcategoryView category={selectedCategory} setSelected={this.setSelected} categoryNumber={this.state.selected.category} addSubcategory={this.addSubcategory}/>
            }
        }

        //Updating state with new view
        this.setState((prevState) => {
            return {
                ...prevState,
                view: view
            }
        });
    }

    //Returns the categories if the state has been initialized, null otherwise
    getCats = () => this.state ? this.state.categories : null;

    //Returns the selected category and subcategory if the state has been initialized, false otherwise
    getSelected = () => this.state && this.state.selected ? {
        category: parseInt(this.state.selected.category), 
        subcategory: parseInt(this.state.selected.subcategory)
    } : null;

    //Sets the selected category and subcategory according to given parameters and updates the URL
    setSelected = (category = -1, subcategory = -1) => {
        const url = new URL(document.location);

        //Setting URL search parameters
        if(category >= 0) url.searchParams.set("category", category);
        else url.searchParams.delete("category");
        if(subcategory >= 0) url.searchParams.set("subcategory", subcategory);
        else url.searchParams.delete("subcategory");
        
        //Only update the search params if we were already on this path
        if(!(document.location.search === "" && category === -1 && subcategory === -1))
            window.history.pushState(null, '', url.toString());

        //Setting the selected category and subcategory
        this.setState((prevState) => {
            return {
                ...prevState,
                selected: {
                    category: category,
                    subcategory: subcategory
                }
            }
        }, ()=>this.updateView()); //Update the view after category and subcategory are updated
    }

    //Adds a category and updates the view
    addCategory = (categoryName) => {
        addCategory(categoryName) //Adding category to the database
            //Getting the new categories list
            .then(async () => {
                let categories = await getCategories().catch((error) => {
                    alert(error); //Error getting categories
                });
                this.setState({
                    categories: categories
                });
            })
            .then(()=>this.updateView()) //Update the view after the new category has been added
            .catch((error) => {
                console.error(error);
                alert(error); //Error creating new category
            })

    }

    //Adds a subcategory to the given category and updates the view
    addSubcategory = (categoryName, subcategoryName) => {
        addSubcat(categoryName, subcategoryName) //Adding subcategory to the database
            //Getting the new categories list
            .then(async () => {
                let categories = await getCategories().catch((error) => {
                    alert(error); //Error getting categories
                });
                this.setState({
                    categories: categories
                });
            })
            .then(()=>this.updateView()) //Update the view after the new subcategory has been added
            .catch((error) => {
                console.error(error);
                alert(error); //Error creating new subcategory
            })

    }

    render() {
        return (
            <div style={{height: '100%', display: 'flex', overflow: "hidden"}}>
                <Sidebar getCategories={this.getCats} getSelected={this.getSelected} setSelected={this.setSelected}/>
                <div className="view-window">
                    {this.state ? this.state.view : ""}
                </div>
            </div>
        )
    }
}

