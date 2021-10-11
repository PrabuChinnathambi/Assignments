import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className="nabbar_page">
            <nav className="navMenu">
                <Link to="/home">Home</Link>
                <Link to="/tableData">Table</Link>
                <Link to="/fileUpload">Video</Link>
                <Link to="/">Logout</Link>
                <div class="dot"></div>

                
            </nav>

        </div>
    )
}

export default Navbar
