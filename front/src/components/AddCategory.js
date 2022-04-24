import React, { Component } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

//Modal that allows user to add a document
export default class AddCategory extends Component {

    state = {
        show: false,
        formInput: {}
    }

    //Handlers for modal opening and closing
    handleOpen = () => {
        this.setState({show: true});
    }
    handleClose = () => {
        this.setState({show: false});
    }
    handleToggle = () => {
        this.setState((prevState) => {return {show: !prevState.show}});
    }

    //Changes the state whenever the form is modified
    handleChange = (event) => {
        this.setState((prevState) => {
            return {
                formInput: {
                    ...prevState.formInput,
                    [event.target.id]: event.target.value
                }
            }
        });
    }

    //Submits the data entered in the add document form
    submitForm = (event) => {
        event.preventDefault();
        this.handleClose();
        
        //Call parent function to add category
        //This isn't using backend because this component will be used for adding categories and subcategories, meaning it will need custom add functions
        this.props.addCategory(this.state.formInput.name);
        
        //Clear form
        this.setState({formInput: {}});
    }

    render = () => {
        return (
            <div>
                <Button variant="success" onClick={this.handleOpen} style={this.props.style}>Add</Button>
                <Modal show={this.state.show} onHide={this.handleClose} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Enter a name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitForm}>
                            <Form.Group controlId="name" onChange={this.handleChange} style={{width: "100%"}}>
                                <Form.Control className="dataInput" placeholder="Enter a name" required />
                            </Form.Group>
                            <br />
                            <div style={{width: "100%", textAlign: "center"}}>
                                <Button className="appColor" type="submit" style={{width: "80%", borderRadius: "25px"}}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
            
        )
    }
}