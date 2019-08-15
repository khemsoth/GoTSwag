/*  This page is for registering a new user. */

import axios from "axios";
import LogNav from "../components/LogNav";
import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap'; 
import "../Register.css"
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';

class Register extends Component {
	constructor() {
		super()
		this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isLoggedIn: 0,
            confirm_password: "",
            redirect: false,
            modal: false,
            nestedModal: false,
            closeAll: false
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
	}
    
    toggle() {

        //  This function is necessary for pop-up window functionality.

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    } 

    //-------------------------------------------------------------------------

    toggleNested() {

        //  This function opens pop-up window with validation if already registered e-mail is attempted to be entered.

        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    //------------------------------------------------------------------------

    toggleAll() {

        //  This function is necessary for pop-up window functionality.

        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    //-------------------------------------------------------------------------

    handleInputChange = event => {

        //  This function stores user input into state variables.

        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
        console.log("value is " + value);

    }

    //----------------------------------------------------------------------

    handleFormSubmit(event) {

        //  This function registeres new user if user input information is correct.

        event.preventDefault()
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());
        var letter = /^[a-zA-Z0-9]+$/;
        var ValidatePassword = letter.test(this.state.password); //match a letter _and_ a number
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());

        //request to server to add a new username/password
        if (this.state.userName && this.state.firstName && this.state.lastName && ValidateEmail && ValidatePassword &&
            this.state.password == this.state.confirm_password && /^[a-zA-Z]+$/.test(this.state.firstName) &&
            /^[a-zA-Z]+$/.test(this.state.lastName)) {
		axios.post('/register', {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            isLoggedIn: 1
		})
			.then(response => {
				if (!response.data.err) {
                    if (response.data.error == 'User already exists')   {
                        this.toggleNested();
                    }
                    else {
                        this.props.history.push('/login');
                    }
				} else {
                    this.toggleNested();
				}
			}).catch(error => {
				console.log(error);
            })
        }
	}

    render() {
        return (
            <div id="reg-body">
                <div className="outer-wrapper">
                <LogNav />
                <div className="reg-container">
                    <p id="reg-title">Sign Up</p>
                    <AvForm className="reg-form">
                        <div className="reg-box1">
                            <AvField
                                className="input-box"
                                name="userName"
                                placeholder="username"
                                value={this.state.userName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter user name' }
                                }}
                            />
                            <AvField
                                className="input-box"
                                name="firstName"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter first name' },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' }
                                }}
                            />
                            <AvField
                                className="input-box"
                                name="lastName"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter last name' },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' }
                                }}
                            />
                            <AvField
                                className="input-box"
                                name="email"
                                placeholder="e-mail"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                validate={{
                                    email: { value: true, errorMessage: 'Please enter valid e-mail' },
                                    required: { value: true, errorMessage: 'Please enter e-mail' }
                                }}
                            />
                            <AvField
                                className="input-box"
                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter password' },
                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                    minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                                }}
                            />
                            <AvField
                                className="input-box"
                                type="password"
                                name="confirm_password"
                                placeholder="confirm_password"
                                value={this.state.confirm_password}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter password' },
                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                    minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' },
                                    match: { value: 'password', errorMessage: 'Passwords must match' }
                                }}
                            />
                        </div>
                        <Button className="submit-btn" color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
                </div>
                <div>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>E-mail already in use</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleAll}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Register;