import React from "react";
import { Link } from 'react-router-dom'
import logo from './images/logo.png'
import './styles/navbar.css';

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
                    <li><Link to="/Searchpage">Search</Link></li>
                    <li><Link to="/Profilepage">Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar