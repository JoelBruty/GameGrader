import React from "react";
import { Link } from 'react-router-dom'
import logo from './images/logo.png'
import './Navbar.css';

const Navbar = () => {
    return (
        <nav id="navbar">
            <div id="container">
                <div id="logo">
                    <Link to="/Home">
                        <img src={logo} alt="GameGrader Logo" />
                    </Link>
                </div>
                <ul id="nav-links">
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/Search">Search</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar