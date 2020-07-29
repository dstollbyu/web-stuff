import React from 'react';
import { Link } from 'react-router-dom';

// NavbarProj component that renders the header navbar in the page, specifically designed for project pages
const NavbarProj = () => {
  return (
    <header>
      <nav id="navbar">
        <ul>
          <li><Link className="nav-link" to="/">Home</Link></li>;  
        </ul>
      </nav>
    </header>
  );
};

export default NavbarProj;