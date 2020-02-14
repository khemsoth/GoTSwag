/*  this is navigation bar for log in page. */

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function EnterNav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">GoT Swag</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/register">Sign Up</a>
            </li>
          </ul>
          </div>
      </nav>
    </header>
  );
}

export default EnterNav;