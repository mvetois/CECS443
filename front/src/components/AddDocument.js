import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

//Modal that allows user to add a document
export default class AddDocument extends Component {

    state = {
        show: false
    }

    handleOpen = () => {
        this.setState({show: true});
    }
    handleClose = () => {
        this.setState({show: false});
    }
    handleToggle = () => {
        this.setState((prevState) => {return {show: !prevState.show}});
    }

    render = () => {
        return (
            <div>
                <Button variant="warning" onClick={this.handleOpen} >Add Document</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sample body text</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Button
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}