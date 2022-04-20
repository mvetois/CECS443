import React, { Component } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

//Modal that allows user to add a document
export default class AddDocument extends Component {

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
        //Doing this to handle radio button input
        if(event.target.id == "lang") event.target.value = event.target.ariaLabel;
        
        this.setState((prevState) => {
            return {
                formInput: {
                    ...prevState.formInput,
                    [event.target.id]: event.target.value
                }
            }
        })
    }

    //Submits the data entered in the add document form
    submitForm = (event) => {
        event.preventDefault();
        this.handleClose();
        console.log(this.state.formInput);
        //TODO Handle document submission with backend

        this.setState({formInput: {}});
    }

    render = () => {
        return (
            <div>
                <Button variant="warning" onClick={this.handleOpen} >Add Document</Button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitForm}>
                            <div style={{display: "flex", marginBottom: "10px"}}>
                                <Form.Group controlId="title" onChange={this.handleChange} style={{width: "100%", marginRight: "100px"}}>
                                    <Form.Control className="dataInput" placeholder="Title of the document" required />
                                </Form.Group>
                                <Form.Group controlId="lang" onChange={this.handleChange}>
                                    <div style={{display: "grid", width: "150px"}}>
                                        <Form.Check
                                            inline
                                            label="Français"
                                            name="lang"
                                            type="radio"
                                            aria-label="FR"
                                            required
                                        />
                                        <Form.Check
                                            inline
                                            label="English"
                                            name="lang"
                                            type="radio"
                                            aria-label="EN"
                                            required
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                            
                            <Form.Group controlId="desc" onChange={this.handleChange} style={{marginBottom: "10px", width: "100%"}}>
                                <Form.Control className="descBox" placeholder="Description" required as="textarea" rows="3" style={{borderRadius: "25px", resize: "none"}}/>
                            </Form.Group>
                            <Form.Group controlId="file" onChange={this.handleChange} style={{marginBottom: "10px"}}>
                                <Form.Control type="file" className="dataInput" required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
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