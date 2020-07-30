import React from 'react';
import './MedOfficeTemplate.css';
import NavbarProj from './NavbarProj.js';
import { Link } from 'react-router-dom';

import caduceus from '../images/caduceus.png'; // https://pixabay.com/vectors/health-medicine-serpent-wings-304919/
import docScope from '../images/doctor_splash.jpg'; // https://unsplash.com/

// Phone icon
const phone = <svg height="32" viewBox="0 0 16 16" fill="#003d7a"> <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/> </svg>;

// Main component to export for Medical Office Template site
const MedOfficeTemplate = () => {
  return (
    <>
      <NavbarProj />
      <div className="medContainer">
        <header className="medHeader">
          <div style={{display: 'flex'}}>
            <img src={caduceus} alt="" style={{height: '96px'}} />
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
              <div className="medLogo">
                Medical Office
              </div>
              <div className="medMotto">
                Here to serve and help your ouchies
              </div>
            </div>
          </div>
          <div className="medContactHeader">
            {phone}
            <span style={{width: '64px'}}>...</span>
            <p className="medPhone">800-867-5309</p>
          </div>
        </header>
        <nav className="medNavbar">
          <ul>
            <Link to=""><li>ABOUT</li></Link>
            <Link to=""><li>SERVICES</li></Link>
            <Link to=""><li>FAQ</li></Link>
            <Link to=""><li>CONTACT US</li></Link>
          </ul>
        </nav>
        <div className="medContent">
          <div style={{backgroundImage:`url(${docScope})`, opacity: 0.6}}></div>
        </div>
      </div>
    </>
  )
}

export default MedOfficeTemplate;
