import React from "react";
import { Link } from 'react-router-dom'
import logo from './images/logo.png'
import './Navbar.css';
import profile from './images/profile.png'
import search from './images/search.png'
import homeicon from './images/homeicon.png'


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
                    <li><Link to="/Home"><img src={homeicon}/>Home</Link></li>
                    <li><Link to="/Search"><img src={search}/>Search</Link></li>
                    <li><Link to="/Profile"><img src={profile}/> Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar