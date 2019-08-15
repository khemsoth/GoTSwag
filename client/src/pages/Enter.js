//  This is log in page.

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EnterNav from "../components/EnterNav";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Axios from 'axios';
import "../enter.css"

class Enter extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            isLoggedIn: 0,
            redirect: false,
            modal: false,
            nestedModal: false,
            closeAll: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    toggle() {

        //  This function is necessary for opening and closing pop-up window.

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    //-----------------------------------------------------------------------

    toggleNested() {

        //  This function opens pop-up window if correct format credentials are entered.

        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    //-----------------------------------------------------------------------

    toggleAll() {

        //  This function is necessary for correct pop-up window operation.

        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    //------------------------------------------------------------

    setRedirect = () => {

        //  This function sets state variable of redirect to true.        

        this.setState({
            redirect: true
        })
    }

    //-------------------------------------------------------------

    updateIsLoggedIn = () => {

        //  This function logs user in.

        Axios.put('/login', {
            email: this.state.email,
            isLoggedIn: 1
        }).then((res) => {
            this.props.history.push('/sale');
        }).catch(error => {
            console.log(error)
        })
    }
    //-------------------------------------------------------------

    handleInputChange = event => {

        //  This function changes state variables when user enters any values.

        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    //-------------------------------------------------------------

    handleFormSubmit = event => {

        //  This function checks if input user credentials are correct, and logs user in.

        event.preventDefault();
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());
        var letter = /^[a-zA-Z0-9]+$/;
        var ValidatePassword = letter.test(this.state.password); //match a letter _and_ a number
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ValidateEmail = re.test(String(this.state.email).toLowerCase());

        if (ValidateEmail && ValidatePassword) {
            Axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                if (res.data.message) {
                    this.props.getLoggedInUser(res.data)
                    this.setRedirect();
                    this.updateIsLoggedIn();
                } else {
                    alert("Login information does not match");
                }
            }).catch(error => {
                this.toggleNested();
            })
        }
    }

    render() {
        return (
            <div className="enter-body">
                <EnterNav />
                <div className='enter-container'>
                    <p className="enter-title">Sign In</p>
                    <AvForm className="enter-form">
                        <AvField
                            name="email"
                            placeholder="email"
                            type="email"
                            onChange={this.handleInputChange}
                            validate={{
                                email: { value: true, errorMessage: 'Please enter valid e-mail' },
                                required: { value: true, errorMessage: 'Please enter e-mail' }
                            }} />
                        <AvField
                            name="password"
                            type="password"
                            placeholder="password"
                            value={this.state.handleInputChange}
                            onChange={this.handleInputChange}
                            validate={{
                                required: { value: true, errorMessage: 'Please enter password' },
                                pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your password must be composed only with letter and numbers' },
                                minLength: { value: 6, errorMessage: 'Your password must be between 6 and 16 characters' },
                                maxLength: { value: 16, errorMessage: 'Your password must be between 6 and 16 characters' }
                            }} />
                        <Button className="enter-btn" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
                <div>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader>User not registered</ModalHeader>
                        <ModalFooter>
                            <Button className="enter-btn" onClick={this.toggleAll}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default withRouter(Enter);