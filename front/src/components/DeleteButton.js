import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

//Modal that allows user to add a document
export default class DeleteButton extends Component {

    state = {
        show: false
    }

	componentDidMount = () => {
		this.mounted = true;
	}
	componentWillUnmount = () => {
		this.mounted = false;
	}

    //Handlers for modal opening and closing
    handleOpen = () => {
        this.mounted && this.setState({show: true});
    }
    handleClose = () => {
        this.mounted && this.setState({show: false});
    }
    handleToggle = () => {
        this.mounted && this.setState((prevState) => {return {show: !prevState.show}});
    }

	handleDelete = async () => {
		if(await this.props.delete()) this.handleClose();
	}

    render = () => {
        return (
            <div>
                <Button className="clear-button" variant="danger" onClick={this.handleOpen} 
					style={{
						...this.props.style
					}}>x</Button>
                <Modal show={this.state.show} onHide={this.handleClose} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this {this.props.itemTypeName}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center", }}>
						<Button variant="secondary" onClick={this.handleClose} style={{marginRight: "20px"}}>Cancel</Button>
						<Button variant="danger" onClick={this.handleDelete}style={{marginLeft: "20px"}}>Delete</Button>
                    </Modal.Body>
                </Modal>
            </div>
            
        )
    }
}