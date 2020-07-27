import React from 'react';

// Navbar component that renders the header navbar in the page
const Navbar = ({links}) => {
  return (
    <header>
      <nav id="navbar">
        <ul>
          {links.map(element => {
            return (<li><a className="nav-link" href={element.link}>{element.name}</a></li>);
            })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;