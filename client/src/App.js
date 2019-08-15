//  This page connect all major react pages through html routes.

import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Enter from "./pages/Enter";
import Sale from "./pages/Sale";
import Order from "./pages/Orders";
import Account from "./pages/Account";
 

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: null,
      LoggedInUserData: false,
      userData: ""
    }
    this.getLoggedInUser = this.getLoggedInUser.bind(this)
  }

 //-------------------------------------------------------------------------------

  getLoggedInUser(userData) {

  //do axios call to get logged in user. and pass that object to other pages  

    localStorage.setItem('loggedInUserId', userData.user.id );
    localStorage.setItem('loggedInUserEmail', userData.user.email );
    localStorage.setItem('loggedInUserName', userData.user.userName );
    this.setState({ userData });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/account" component= {() => <Account userData={this.state.userData} />} />
            <Route path="/login" render={() => <Enter getLoggedInUser={this.getLoggedInUser} />} />
            <Route exact path="/sale" component={() => <Sale userData={this.state.userData} />} /> 
            <Route exact path="/orders" component= {() => <Order userData={this.state.userData} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
