import React from 'react';
import { Button } from 'react-bootstrap';

//View of all the subcategories in a given category
export default class SubcategoryView extends React.Component {

    handleClick = (index) => {
        this.props.setSelected(this.props.categoryNumber, index);
    }

	getCategoriesGrid = () => {
		//Categories have not yet been pulled from the database
		if(this.props.category == null) return <h2>Loading...</h2>

		//List of categories is empty
		if(this.props.category.subcategories.length == 0) return <h5>There are currently no subcategories</h5>

		//Returning grid of subcategories
		return <React.Fragment> <h2 style={{}}>{this.props.category.name}</h2>
                <div className="dynamic-grid">
					{this.props.category.subcategories.map((cat, index) => {
						return (
							<Button className="grid-item" key={index} onClick={()=>this.handleClick(index)}>
								{cat.name}
							</Button>
						)
					})}
			</div></React.Fragment>
	}

    addSubcategory = () => {
        this.props.addSubcategory(this.props.category.name, "subcat" + this.props.category.subcategories.length);
    }

	render() {

		return (
			<div style={{position: "relative"}}>
                <Button variant="danger" onClick={()=>this.props.setSelected()} style={{left: "0px", position: "absolute"}}>Temp Back Button</Button>
                {/* TODO Add a check for if this user is admin to show the add subcat button */}
                <Button variant="success" onClick={this.addSubcategory} style={{right: "0px", position: "absolute"}}>Temp Add Subcategory</Button>
				{this.getCategoriesGrid()}
			</div>
		)
	}
}