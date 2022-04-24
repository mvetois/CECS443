import React from 'react';
import { Button } from 'react-bootstrap';
import AddCategory from "./AddCategory";

//View of all the categories
export default class CategoryView extends React.Component {

	handleClick = (index) => {
		this.props.setSelected(index, -1);
	}

	getCategoriesGrid = () => {
		let categories = this.props.getCategories();
		//Categories have not yet been pulled from the database
		if(categories == null) return <h2>Loading...</h2>

		//List of categories is empty
		if(categories.length === 0) return <h5>There are currently no categories</h5>

		//Returning grid of categories
		return <React.Fragment> <h2>List of Categories</h2>
			<div className="dynamic-grid">
					{categories.map((cat, index) => {
						return (
							<Button className="grid-item" key={index} onClick={() => this.handleClick(index)}>
								{cat.name}
							</Button>
						)
					})}
			</div></React.Fragment>
	}

	render() {

		return (
			<div style={{position: "relative"}}>
				{/* TODO Add a check for if this user is admin to show the add subcat button */}
				<AddCategory addCategory={(name) => this.props.addCategory(name)} style={{right: "0px", position: "absolute"}}/>
				{this.getCategoriesGrid()}
			</div>
		)
	}
}