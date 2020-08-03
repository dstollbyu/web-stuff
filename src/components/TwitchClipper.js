import React from 'react';
import './TwitchClipper.css';
import NavbarProj from './NavbarProj.js';

const TwitchClipper = () => {
  return (
    <>
      <NavbarProj />
      <div className="clipContainer">
        <form className="search">
          <p>Enter a username:</p>
          <input id="search" isFocused />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default TwitchClipper;