import React from "react";
import { Link } from "react-router-dom";
import "./nav-bar.css"


function NavBar(props) {
  return (
    <div className="nav-bar-wrapper">
        <div className="nav-bar-logo">

            <a href="/">Logo</a>
        </div>
        <div className="nav-bar-name">
            {props.page}
        </div>
        <div className="nav-bar-links-wrapper">
            <div className="nav-bar-link home">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-bar-link about">
                <Link to="/">About</Link>
            </div>
            <div className="nav-bar-link">
                <Link to="/cart">Cart</Link>
            </div>
        </div>
    </div>
  );
}

export default NavBar;
