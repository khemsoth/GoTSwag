//  This file is for adding additional account information like credit card number.

import axios from "axios";
import EditNav from "../components/EditNav";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import "../Account.css"
import moment from 'moment';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "Not Logged in",
            address: "",
            city: "",
            state: "",
            zip: "",
            creditCardNumber: "",
            expDate: "",
            cvv: "",
            loggedInUserName: "",
            loggedInUserEmail: "",
            loggedInUserId: ""
        }
    }

    //------------------------------------------------------------------------

    handleInputChange = event => {

        //  This function accepts user input.

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log("value is " + value);
    }

    //------------------------------------------------------------------------

    handleFormSubmit = event => {

        //  This function updates user account when submit button is clicked.

        const user = {
            email: this.state.loggedInUserEmail,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            creditCardNumber: this.state.creditCardNumber,
            expDate: this.state.expDate,
            cvv: this.state.cvv
        }
        if (
            user.address && user.city && user.state && this.ValidateZip() && this.ValidateCCNumber() &&
            this.ValidateDate() && (/^[0-9]+$/.test(user.cvv) && user.cvv.length == 3)
        ) {
            var _this = this;
            axios.put("/api/account", user)
                .then(function (response) {
                    _this.props.history.push('/sale');
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    //------------------------------------------------------------------------

    componentDidMount() {

        //  This function loads user information from local storage when account page is opened.

        var loggedInUserName = localStorage.getItem('loggedInUserName');
        var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        var loggedInUserId = localStorage.getItem('loggedInUserId');

        this.setState({ loggedInUserName });
        this.setState({ loggedInUserEmail });
        this.setState({ loggedInUserId });
    }

    //------------------------------------------------------------------------

    ValidateDate() {

        // This function validates if date is in correct format and its not in the past.

        // Return today's date and time
        var currentTime = new Date();
        // returns the month (from 0 to 11)
        var month = currentTime.getMonth() + 1;
        // returns the year (four digits)
        var year = currentTime.getFullYear();
        var expired = false;

        if (this.state.expDate.length > 4) {
            var enteredyear = this.state.expDate[3] + this.state.expDate[4];
            var intyear = parseInt(enteredyear, 10) + 2000;
            var enteredmonth = this.state.expDate[0] + this.state.expDate[1];
            var intmonth = parseInt(enteredmonth, 10);
            if ((year > intyear) || (year == intyear && month > intmonth)) {
                expired = true;
            }
        } else {
            expired = true;
        }
        return (moment(this.state.expDate, 'MM/YY', true).isValid() && !expired);
    }

    //------------------------------------------------------------------------

    ValidateCCNumber() {

        //  This function validates if credit card number is in correct format.

        var number = /^[0-9]+$/;

        return (number.test(this.state.creditCardNumber) && this.state.creditCardNumber.length == 16);
    }

    //------------------------------------------------------------------------

    ValidateZip() {

        //  This function validates if zip code is in correct format.

        var number = /^[0-9]+$/;

        return (number.test(this.state.zip) && this.state.zip > 9999);
    }

    //------------------------------------------------------------------------

    ValidatePassword() {

        //  This function validates if password is in correct format.

        var letter = /^[a-zA-Z0-9]+$/;
        var valid = letter.test(this.state.password); //match a letter _and_ a number

        return valid;
    }

    //------------------------------------------------------------------------

    ValidateEmail() {

        //  This function validates if e-mail is in correct format.

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(this.state.email).toLowerCase());
    }

    render() {
        return (
            <div id="account-body">
                <EditNav userData={this.state.userData} />
                <div className="account-container">
                    <p id="account-title">Edit Account Info</p>
                    <p className="account-user">{this.state.loggedInUserName}</p>
                    <AvForm>
                        <div className="account-box1">
                            <AvField
                                name="address"
                                placeholder="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter address' }
                                }}
                            />
                            <AvField
                                name="city"
                                placeholder="city"
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter city' }
                                }}
                            />
                            <AvField
                                type="select"
                                name="state"
                                value={this.state.state}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter state' }
                                }}
                            >
                                <option value="">State</option>
                                <option value="Alaska">AK</option>
                                <option value="Alabama">AL</option>
                                <option value="Arkansas">AR</option>
                                <option value="Arizona">AZ</option>
                                <option value="California">CA</option>
                                <option value="Colorado">CO</option>
                                <option value="Connecticut">CT</option>
                                <option value="Delaware">DE</option>
                                <option value="Florida">FL</option>
                                <option value="Georgia">GA</option>
                                <option value="Hawaii">HI</option>
                                <option value="Iowa">IA</option>
                                <option value="Idaho">ID</option>
                                <option value="Illinios">IL</option>
                                <option value="Indiana">IN</option>
                                <option value="Kansas">KS</option>
                                <option value="Kentucky">KY</option>
                                <option value="Lousiana">LA</option>
                                <option value="Massachusetts">MA</option>
                                <option value="Maryland">MD</option>
                                <option value="Maine">ME</option>
                                <option value="Michigan">MI</option>
                                <option value="Minnesota">MN</option>
                                <option value="Missouri">MO</option>
                                <option value="Mississippi">MS</option>
                                <option value="Montana">MT</option>
                                <option value="North Carolina">NC</option>
                                <option value="North Dakota">ND</option>
                                <option value="Nebraska">NE</option>
                                <option value="New Hampshire">NH</option>
                                <option value="New Jersey">NJ</option>
                                <option value="New Mexico">NM</option>
                                <option value="Nevada">NV</option>
                                <option value="New York">NY</option>
                                <option value="Ohio">OH</option>
                                <option value="Oklahoma">OK</option>
                                <option value="Oregon">OR</option>
                                <option value="Pennsylvania">PA</option>
                                <option value="Rhode Island">RI</option>
                                <option value="South Carolina">SC</option>
                                <option value="South Dakota">SD</option>
                                <option value="Tennessee">TN</option>
                                <option value="Texas">TX</option>
                                <option value="Utah">UT</option>
                                <option value="Virginia">VA</option>
                                <option value="Vermont">VT</option>
                                <option value="Washington">WA</option>
                                <option value="Wisconsin">WI</option>
                                <option value="West Virginia">WV</option>
                                <option value="Wyoming">WY</option>
                            </AvField>
                            <AvField
                                name="zip"
                                placeholder="Zip code"
                                value={this.state.zip}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter zip code' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 5, errorMessage: 'Please enter 5 digit zip code' },
                                    maxLength: { value: 5, errorMessage: 'Please enter 5 digit zip code' }
                                }}
                            />
                        </div>
                        <div className="account-box2">
                            <AvField
                                name="creditCardNumber"
                                placeholder="Credit Card Number"
                                value={this.state.creditCardNumber}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter credit card number' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 16, errorMessage: 'Please enter 16 digit credit card number' },
                                    maxLength: { value: 16, errorMessage: 'Please enter 16 digit credit card number' }
                                }}
                            />
                            <AvField
                                name="expDate"
                                placeholder="Expiration Date"
                                value={this.state.expDate}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter date' },
                                    date: { format: 'MM/YY', errorMessage: 'Please enter date in MM/YY format' }
                                }}
                            />
                            <AvField
                                name="cvv"
                                placeholder="cvv"
                                value={this.state.cvv}
                                onChange={this.handleInputChange}
                                validate={{
                                    required: { value: true, errorMessage: 'Please enter cvv' },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Please enter only numbers' },
                                    minLength: { value: 3, errorMessage: 'Please enter 3 digit cvv' },
                                    maxLength: { value: 3, errorMessage: 'Please enter 3 digit cvv' }
                                }}
                            />
                        </div>
                        <Button className="submit-btn" color="secondary" onClick={this.handleFormSubmit}>Submit</Button>
                    </AvForm>
                </div>
            </div>
        );
    }
}
export default withRouter(Account);