import React, { Component } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { addData } from "../Backend";

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
        let val = event.target.value;

        //Doing this to handle radio button input
        if(event.target.id==="lang") val = event.target.ariaLabel;
        else if(event.target.id==="file") val = event.target.files[0];

        this.setState((prevState) => {
            return {
                formInput: {
                    ...prevState.formInput,
                    [event.target.id]: val
                }
            }
        });
    }

    //Submits the data entered in the add document form
    submitForm = (event) => {
        event.preventDefault();
        this.handleClose();
        //TODO Pass down the category and subcategory through props to provide in the addData parameters
        addData("testCI", "subcat1", this.state.formInput.title, this.state.formInput.desc, this.state.formInput.lang, this.state.formInput.file)
        
        //Clear form
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