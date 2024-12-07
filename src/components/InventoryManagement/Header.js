import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/nilameLogo.png";


function Header() {

    return (
        <nav class="navbar bg-brown">
            <div class="container">
                <a class="navbar-brand" href="#" style={{ fontWeight: 'bold', fontSize: '24px', color: '#fff' }}>
                    Bon Bon Hotel
                </a>
            </div>
        </nav>
    )
}

export default Header;