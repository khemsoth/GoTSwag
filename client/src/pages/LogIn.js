//  This function displays log in page.

import React from "react";
import LoginNav from "../components/LoginNav";
import Slide from "../components/Slider";
import "../Login.css"

function LogIn() {
    return (
        <div className="App login">           
            <LoginNav />
            <Slide />
        </div>
    );
}

export default LogIn;