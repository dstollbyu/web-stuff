import React from 'react';
import '../MedOfficeTemplate.css';

import doc2 from '../../images/doctor2.jpg'; // https://unsplash.com/

const About = () => {
  const [imageReady, setImageReady] = React.useState(false);

  // Side effect to preload image
  React.useEffect(() => {
    const img = new Image();
    img.src = doc2;
    
    // Don't load the content until the images are loaded
    img.onload = () => {
      setImageReady(true);
    }
    
  })

  // If image isn't loaded into browser yet, put loading data
  if (!imageReady) {
    return (
      <>
        <div className="medContent">Loading ...</div>
      </>
    )
  } else { // Else return actual content
    return (
      <>
        <div className="medContent">
          {/* Transparent background behind text */}
          <div className="BG aboutBG"></div>
          <div className="medContentContainer">
            <h2>About</h2>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </>
    )
  }
}

export default About;