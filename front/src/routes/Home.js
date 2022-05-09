import React from "react";
import { useNavigate } from "react-router-dom";
import { addCategory, addSubcat, getCategories, remCategory, remSubcat } from "../Backend";
import CategoryView from "../components/CategoryView";
import DocumentsView from "../components/DocumentsView";
import Sidebar from "../components/Sidebar";
import SubcategoryView from "../components/SubcategoryView";

//Home page showing the file system and allowing the user to traverse it
export default class Home extends React.Component {
    componentDidMount = async () => {
        this.mounted = true;
        const urlParams = new URLSearchParams(document.location.search);

        //Setting up page to accurately represent what's shown in the URL search parameters
        let tempCat = urlParams.get("category"), tempSubcat = urlParams.get("subcategory");
        tempCat = (tempCat !== null ? tempCat : -1);
        tempSubcat = (tempSubcat !== null ? tempSubcat : -1);
        
        //Getting the categories from the database, redirect if not logged in
        let categories = await getCategories().catch((error) => {
            if(error.message === "User is not logged in") 
                document.location.replace("/login");
            else alert(error);
            return null;
        });
        this.mounted && this.setState({
            categories: categories
        }, () => this.setSelected(tempCat, tempSubcat));
    }

    componentWillUnmount = () => this.mounted = false;

    //Updates the view to include new data and switch to different views if there's been a new selection
    updateView = () => {
        //Default view shows all categories
        let view = <CategoryView getCategories={this.getCats} setSelected={this.setSelected} addCategory={this.addCategory} deleteCategory={this.deleteCategory} />

        if(this.state.selected.category >= 0) {
            let selectedCategory = this.state && this.state.categories.length > this.state.selected.category ? this.state.categories[this.state.selected.category] : null;
            if(this.state.selected.subcategory >= 0) { //If we have a subcategory selected, show all documents in that subcategory
                let selectedSubcat = selectedCategory && selectedCategory.subcategories.length > this.state.selected.subcategory ? selectedCategory.subcategories[this.state.selected.subcategory] : null;
                view = <DocumentsView key={selectedSubcat.name} category={selectedCategory} subcategory={selectedSubcat} goBack={()=>this.setSelected(this.state.selected.category)} />
            }
            else { //If we just have a category selected, we show the subcategories within
                view = <SubcategoryView category={selectedCategory} setSelected={this.setSelected} categoryNumber={this.state.selected.category} addSubcategory={this.addSubcategory} deleteSubcat={this.deleteSubcat} goBack={()=>this.setSelected()}/>
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

    //Removes the given category and updates the view
    deleteCategory = async (index) => {
        return remCategory(this.state.categories[index].name)
        .then(()=>{
            this.setState((prevState) => {
                prevState.categories.splice(index, 1);
                return (prevState);
            }, () => this.updateView());
            return true;
        })
        .catch((error) => {
            alert(error);
            return false;
        })
    }

    //Removes the given subcategory and updates the view
    deleteSubcat = async (categoryIndex, subcategoryIndex) => {
        return remSubcat(this.state.categories[categoryIndex].name, this.state.categories[categoryIndex].subcategories[subcategoryIndex].name)
        .then(()=>{
            this.setState((prevState) => {
                prevState.categories[categoryIndex].subcategories.splice(subcategoryIndex, 1);
                return (prevState);
            }, () => this.updateView());
            return true;
        })
        .catch((error) => {
            alert(error);
            return false;
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

