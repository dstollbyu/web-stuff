import React from 'react';

// NavbarProj component that renders the header navbar in the page, specifically designed for project pages
const NavbarProj = ({ setVis, setChoroVis }) => {
  return (
    <header>
      <nav id="navbar">
        <ul>
          <li><span className="nav-link" style={{cursor:'pointer'}} onClick={() => setVis(true, setChoroVis)}>Home</span></li>;  
        </ul>
      </nav>
    </header>
  );
};

export default NavbarProj;