import { touchRippleClasses } from '@mui/material';
import React from 'react';
import { Button } from 'react-bootstrap';
import { addData, getData, remData } from '../Backend';
import AddDocument from './AddDocument';
import DeleteButton from './DeleteButton';

//View of all the subcategories in a given category
export default class DocumentsView extends React.Component {

	componentDidMount = async () => {
		this.updateDocs();
	}

	updateDocs = async () => {
		//Pulling the document data from database
		if(this.props.subcategory && this.props.category) {
			let subcat = await getData(this.props.category.name, this.props.subcategory.name)
				.catch((error) => {
					alert(error);
					return null;
				});
			this.setState({
				subcategory: subcat ? subcat : null
			});
		}
	}

	getCategoriesGrid = () => {
		//Categories have not yet been pulled from the database
		if(this.props.subcategory === null || !this.state) return <h2>Loading...</h2>

		//List of documents is empty
		if(this.state.subcategory.data === undefined) return <h5>There are currently no documents</h5>

		//Returning grid of subcategories
		return <React.Fragment> <h2>{this.props.category.name + " - " + this.props.subcategory.name}</h2>
                <div className="dynamic-grid">
					{this.state.subcategory.data.map((doc, index) => {
						return (
							<div key={index} style={{position: "relative"}}>
								<Button className="grid-item" onClick={()=>this.handleClick(index)}>
									<h4>{doc.lang + " - " + doc.name}</h4>
									<div>{doc.description}</div>
								</Button>
								<DeleteButton delete={() => this.deleteDocument(index)} itemTypeName="document"
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

	handleClick = (index) => {
		const downloadLink = document.createElement("a");
		downloadLink.href = this.state.subcategory.data[index].data;
		downloadLink.download = this.state.subcategory.data[index].name;
		downloadLink.click();
	}

	addDocument = async (doc) => {
		let res = await addData(this.props.category.name, this.state.subcategory.name, doc.title, doc.desc, doc.lang, doc.file)
		.catch((error) => {
			alert(error);
			return -1;
		});
		if(res === -1) return;

		this.updateDocs();
	}

	deleteDocument = async (index) => {
		return remData(this.props.category.name, this.state.subcategory.name, this.state.subcategory.data[index].name)
			.then(()=>{
				this.setState((prevState) => {
					prevState.subcategory.data.splice(index, 1);
					return (prevState);
				})
				return true;
			})
			.catch((error) => {
				alert(error);
				return false;
			})
	}

	render() {
		if(!this.state) return <h2>Loading...</h2>
		if(!this.state.subcategory) return <h2>Error getting category, please return</h2>

		return (
			<div style={{position: "relative"}}>
                <Button variant="danger" onClick={()=>this.props.goBack()} style={{left: "0px", position: "absolute"}}>Temp Back Button</Button>
                {/* TODO Add a check for if this user is admin to show the add document button */}
				<AddDocument addDocument={(doc)=>this.addDocument(doc)} style={{right: "0px", position: "absolute"}}/>
				{this.getCategoriesGrid()}
			</div>
		);
	}
}