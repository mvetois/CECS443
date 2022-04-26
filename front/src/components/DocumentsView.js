import React from 'react';
import { Button } from 'react-bootstrap';
import { getData } from '../Backend';
import AddDocument from './AddDocument';

//View of all the subcategories in a given category
export default class DocumentsView extends React.Component {

	componentDidMount = async () => {
		//Pulling the document data from database
		let subcat = null;
		if(this.props.subcategory && this.props.category) {
			subcat = await getData(this.props.category.name, this.props.subcategory.name)
				.catch((error) => {
					alert(error);
					return null;
				});
		}

		this.setState({
			subcategory: subcat
		});
	}

	getCategoriesGrid = () => {
		//Categories have not yet been pulled from the database
		if(this.props.subcategory === null || !this.state) return <h2>Loading...</h2>

		//List of documents is empty
		if(this.state.subcategory.data === undefined) return <h5>There are currently no documents</h5>

		//Returning grid of subcategories
		return <React.Fragment> <h2>{this.props.subcategory.name}</h2>
                <div className="dynamic-grid">
					{this.state.subcategory.data.map((doc, index) => {
						return (
							<Button className="grid-item" key={index} onClick={()=>this.handleClick(index)}>
								Download {doc.name}
							</Button>
						)
					})}
			</div></React.Fragment>
	}

	handleClick = (index) => {
		const downloadLink = document.createElement("a");
		downloadLink.href = this.state.subcategory.data[index].data;
		downloadLink.download = this.state.subcategory.data[index].name;
		downloadLink.click();
	}

	render() {
		if(!this.state) return <></>
		if(!this.state.subcategory) return <h2>Error getting category, please return</h2>

		return (
			<div style={{position: "relative"}}>
                <Button variant="danger" onClick={()=>this.props.goBack()} style={{left: "0px", position: "absolute"}}>Temp Back Button</Button>
                {/* TODO Add a check for if this user is admin to show the add document button */}
				<AddDocument categoryName={this.props.category.name} subcatName={this.props.subcategory.name} style={{right: "0px", position: "absolute"}}/>
				{this.getCategoriesGrid()}
			</div>
		);
	}
}