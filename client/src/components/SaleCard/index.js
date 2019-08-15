//  This is program that loads all sale items on sale page.

import axios from "axios";
import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';
import "./style.css";
class SaleCard extends Component {

  constructor() {
    super()
    this.state = {
      userName: "",
      firstName: "",
      swag1name: "Swag 1",
      swag1quantity: 0,
      swag2name: "Swag 2",
      swag2quantity: 0,
      swag3name: "Swag 3",
      swag3quantity: 0,
      swag4name: "Swag 4",
      swag4quantity: 0,
      swag5name: "Swag 5",
      swag5quantity: 0,
      swag6name: "Swag 6",
      swag6quantity: 0,
      swag7name: "Swag 7",
      swag7quantity: 0,
      swag8name: "Swag 8",
      swag8quantity: 0,
      swag9name: "Swag 9",
      swag9quantity: 0,
      swag10name: "Swag 10",
      swag10quantity: 0,
      email: "",
      loggedInUserName: "",
      loggedInUserEmail: "",
      loggedInUserId: "",
      ccnumber: "",
      cvv: "",
      expdate: "",
      nestedModal: false,
      closeAll: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  };

  //-------------------------------------------------------------------------------

  toggleNested() {

    //  This function turns on pop up window when user attempts to buy an item without entering credit card number. 

    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
    setTimeout(() => {this.props.history.push('/account')}, 3000)
  }

  //-------------------------------------------------------------------------------

  componentDidMount() {

    //  This function loads correct user information when the sale page is opened.

    var loggedInUserName = localStorage.getItem('loggedInUserName');
    var loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    var loggedInUserId = localStorage.getItem('loggedInUserId');

    this.setState({ loggedInUserName });
    this.setState({ loggedInUserEmail });
    this.setState({ loggedInUserId });
    const that = this;
    axios.get('/api/allusers')
      .then(function (res) {
        for (var c = 0; c < res.data.length; c++) {
          if (res.data[c].email == loggedInUserEmail) {
            that.state.email = res.data[c].email;
            var ccnum = String(res.data[c].creditCardNumber);
            var expd = String(res.data[c].expDate);
            that.setState({
              ccnumber: ccnum
            });
            that.setState({
              cvv: res.data[c].cvv
            });
            that.setState({
              expdate: expd
            });
            that.setState({
              email: that.state.loggedInUserEmail
            });
            that.setState({
              swag1quantity: res.data[c].swag1quantity
            });
            that.setState({
              swag2quantity: res.data[c].swag2quantity
            });
            that.setState({
              swag3quantity: res.data[c].swag3quantity
            });
            that.setState({
              swag4quantity: res.data[c].swag4quantity
            });
            that.setState({
              swag5quantity: res.data[c].swag5quantity
            });
            that.setState({
              swag6quantity: res.data[c].swag6quantity
            });
            that.setState({
              swag7quantity: res.data[c].swag7quantity
            });
            that.setState({
              swag8quantity: res.data[c].swag8quantity
            });
            that.setState({
              swag9quantity: res.data[c].swag9quantity
            });
            that.setState({
              swag10quantity: res.data[c].swag10quantity
            });
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  //-------------------------------------------------------------------------------

  buyItem() {

    //  This function changes user database information appropriately when user buys an item.

    const that = this;

    if (this.props.index == 0) {
      that.state.swag1quantity++;
    } else if (this.props.index == 1) {
      that.state.swag2quantity++;
    } else if (this.props.index == 2) {
      that.state.swag3quantity++;
    } else if (this.props.index == 3) {
      that.state.swag4quantity++;
    } else if (this.props.index == 4) {
      that.state.swag5quantity++;
    } else if (this.props.index == 5) {
      that.state.swag6quantity++;
    } else if (this.props.index == 6) {
      that.state.swag7quantity++;
    } else if (this.props.index == 7) {
      that.state.swag8quantity++;
    } else if (this.props.index == 8) {
      that.state.swag9quantity++;
    } else {
      that.state.swag10quantity++;
    }
    const user = {
      swag1quantity: that.state.swag1quantity,
      swag2quantity: that.state.swag2quantity,
      swag3quantity: that.state.swag3quantity,
      swag4quantity: that.state.swag4quantity,
      swag5quantity: that.state.swag5quantity,
      swag6quantity: that.state.swag6quantity,
      swag7quantity: that.state.swag7quantity,
      swag8quantity: that.state.swag8quantity,
      swag9quantity: that.state.swag9quantity,
      swag10quantity: that.state.swag10quantity,
      email: that.state.loggedInUserEmail
    }
    var _this = this;
    if (that.state.expdate && that.state.cvv && that.state.ccnumber) {
      axios.put("/api/buy", user)
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
        this.toggleNested();
    }
  }

  render() {
    const imageStyle = {
      margin: "0 auto",
      padding: "1rem"
    }
    return (
      <div>
        <div className='container-fluid sale-container'>
          <div className="card mb-3">
            <div className="row no-gutters">
              <img src={this.props.image} className='col-md-4 row align-itmes-center justify-content-center' style={imageStyle} />
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.props.name}</h5>
                  <p className="card-desc">{this.props.description}</p>
                  <p className="card-price">{this.props.price}</p>
                  <div className="card-btn">
                    <button className='btn btn-outline-dark' onClick={this.buyItem} itemid={this.props.index}>Buy this item</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
            <ModalHeader>Please enter credit card information!</ModalHeader>
            <ModalFooter>
              <Button className="enter-btn" onClick={this.toggleAll}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
};

export default withRouter(SaleCard);

