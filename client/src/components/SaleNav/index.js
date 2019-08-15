/* This is navigation bar for sale page. */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

class SaleNav extends Component {
  constructor() {
    super()
    this.state = {
      userName: "Please log in",
      user: "",
      loggedInUserName: "",
      loggedInUserEmail: "",
      loggedInUserId: ""
    }
  }

  //-------------------------------------------------------------------------------

  componentDidMount() {

    //  This function loads user information from local storage when sale page is opened.

    var loggedInUserName = localStorage.getItem('loggedInUserName');
    var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    var loggedInUserId = localStorage.getItem('loggedInUserId');

    this.setState({ loggedInUserName });
    this.setState({ loggedInUserEmail });
    this.setState({ loggedInUserId });
  }

  //-------------------------------------------------------------------------------

  Logout() {

    //  This function logs user out.

    var email = localStorage.getItem('loggedInUserEmail');
    localStorage.clear();
    var url = "/api/logout/" + email;

    axios.put(url)
      .then(function (res) {
        localStorage.clear();
      }).catch(function (error) {
        console.log("user is not logged out");
      });
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="sale-nav">
          <a className="navbar-brand" href="/">GoT Swag</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link sale-nav-link">Welcome {this.state.loggedInUserName}<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link sale-nav-link" href="/account">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sale-nav-link" href="/orders">Orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sale-nav-link" href="/" onClick={this.Logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default SaleNav;
