import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Notion Clone</div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/workspace">Workspace</a></li>
                <li><a href="/documents">Documents</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;