import React from 'react';
import './MedOfficeTemplate.css';
import NavbarProj from './NavbarProj.js';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import About from './MedOfficeTemplateComps/About.js';
import Services from './MedOfficeTemplateComps/Services.js';
import FAQ from './MedOfficeTemplateComps/FAQ.js';
import Contact from './MedOfficeTemplateComps/Contact.js';

import caduceus from '../images/caduceus.png'; // https://pixabay.com/vectors/health-medicine-serpent-wings-304919/
import docScope from '../images/doctor_splash.jpg'; // https://unsplash.com/

// Phone icon
const phone = <svg height="32" viewBox="0 0 16 16" fill="#003d7a"> <path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/> </svg>;

// Image preload - https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
const preloadImage = (url) => {
  (new Image()).src = url;
}

// Main component to export for Medical Office Template site
const MedOfficeTemplate = () => {
  // Side effect to preload images
  React.useEffect(() => {
    preloadImage(caduceus);
  })

  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();

  return (
    <div className="medContainer">
      <NavbarProj />
      <MedOfficeHeader />
      <Switch>
        <Route exact path={path}>
          <HomePage />
        </Route>
        <Route path={`${path}/About`} component={About} />
        <Route path={`${path}/Services`} component={Services} />
        <Route path={`${path}/FAQ`} component={FAQ} />
        <Route path={`${path}/Contact`} component={Contact} />
      </Switch>
      <MedOfficeFooter />
    </div>
  );
};

// HomePage component for home content
const HomePage = () => {
  // State hook for image handlers
  const [imageReady, setImageReady] = React.useState(false);

  // Side effect to preload image
  React.useEffect(() => {
    const img = new Image();
    img.src = docScope;
    
    // Don't load the content until the images are loaded
    img.onload = () => {
      setImageReady(true);
    }
  })

  if (!imageReady) {
    return (
      <>
        <div className="medContent">Loading ...</div>
      </>
    )
  } else {
    return (
      <>
        <div className="medContent">
          {/* Transparent background behind text */}
          <div className="BG homeBG"></div>
          <div className="medContentContainer">
            <h2>Medical Office, the kind for you!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sodales elit, sed venenatis ex. Integer vel mauris turpis. Donec non sagittis ex. Pellentesque fermentum felis vel libero fermentum, et volutpat felis viverra. Phasellus eu finibus dolor. Nunc suscipit euismod dignissim. Nam ac metus lacinia, finibus nisl id, porttitor dolor.</p>
            <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam auctor lorem elit, vel interdum magna finibus eget. Vivamus ut ipsum sodales, dapibus mauris nec, dignissim arcu. Integer facilisis dignissim erat, et porta eros tempor et. In ipsum tortor, laoreet at aliquet in, blandit eget purus. Curabitur rhoncus est ut lorem consectetur varius. Nullam vitae enim in risus ornare dictum vitae sed risus. Fusce eleifend turpis eu aliquet condimentum. Integer vitae aliquam arcu, sed ullamcorper quam. In metus nulla, tincidunt vitae ultricies ullamcorper, finibus non lorem. Quisque imperdiet malesuada ligula, sit amet venenatis neque volutpat eget. Duis congue nunc sit amet tellus laoreet auctor. Cras hendrerit orci at suscipit aliquam. Sed eget orci ac nisi vulputate viverra. Vivamus et dolor consectetur, tincidunt ante vitae, molestie erat.</p> 
            <p>Aenean aliquet consectetur magna, id tempor nulla suscipit ac. Nullam tristique feugiat eros ut varius. Nulla sed mollis dolor. Curabitur dapibus lectus ac luctus feugiat. Ut id mi vitae sapien accumsan eleifend. Fusce viverra efficitur sapien, eget malesuada orci maximus eget</p>
          </div>
        </div>
      </>
    )
  }
  
  
}

// MedOfficeHeader component
const MedOfficeHeader = () => {
  return (
    <div className="medTop">
      <header className="medHeader">
        <div style={{display: 'flex'}}>
          <Link to="/MedOfficeTemplate"><img src={caduceus} alt="" style={{height: '96px'}} /></Link>
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
          <Link to="/MedOfficeTemplate/About"><li>ABOUT</li></Link>
          <Link to="/MedOfficeTemplate/Services"><li>SERVICES</li></Link>
          <Link to="/MedOfficeTemplate/FAQ"><li>FAQ</li></Link>
          <Link to="/MedOfficeTemplate/Contact"><li>CONTACT US</li></Link>
        </ul>
      </nav>
    </div>
  );
};

// MedOfficeFooter component
const MedOfficeFooter = () => {
  return (
    <div className="medOfficeFooter">
      <h3 style={{color: 'white'}}>This is a footer</h3>
    </div>
  )
}

export default MedOfficeTemplate;
