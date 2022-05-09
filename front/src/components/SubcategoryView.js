import React from 'react';
import { Button } from 'react-bootstrap';
import { remSubcat } from '../Backend.js';
import AddCategory from "./AddCategory";
import DeleteButton from './DeleteButton.js';

//View of all the subcategories in a given category
export default class SubcategoryView extends React.Component {

    handleClick = (index) => {
        this.props.setSelected(this.props.categoryNumber, index);
    }

	getCategoriesGrid = () => {
		//Categories have not yet been pulled from the database
		if(this.props.category == null) return <h2>Loading...</h2>

		//List of categories is empty
		if(this.props.category.subcategories.length === 0) return <h5>There are currently no subcategories</h5>

		//Returning grid of subcategories
		return <React.Fragment>
                <div className="dynamic-grid">
					{this.props.category.subcategories.map((subcat, index) => {
						return (
							<div key={index} style={{position: "relative"}}>
								<Button className="grid-item" key={index} onClick={()=>this.handleClick(index)}>
									<h4>{subcat.name}</h4>
									{subcat.data ? subcat.data.map((doc, docIndex) => {
										return (
											<div key={docIndex} className="grid-item-subtext">{doc.name}</div>
										)
									}) : ""}
								</Button>
								<DeleteButton delete={() => this.deleteSubcat(index)} itemTypeName="subcategory"
									style={{
										right: "20px",
										bottom: "20px",
										position: "absolute"
									}}/>
							</div>
						)
					})}
			</div></React.Fragment>
	}

	deleteSubcat = async (index) => {
		return await this.props.deleteSubcat(this.props.categoryNumber, index);
	}

	render() {

		return (
			<div style={{position: "relative"}}>
                <Button className="clear-button" variant="danger" onClick={()=>this.props.goBack()} 
					style={{
						left: "0px", 
						position: "absolute"
					}}>{"<"}</Button>
                {/* TODO Add a check for if this user is admin to show the add subcat button */}
                <AddCategory addCategory={(name) => this.props.addSubcategory(this.props.category ? this.props.category.name : "", name)} style={{right: "0px", position: "absolute"}}/>
				<h2>{this.props.category.name}</h2>
				{this.getCategoriesGrid()}
			</div>
		)
	}
}