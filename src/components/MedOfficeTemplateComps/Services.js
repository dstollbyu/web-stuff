import React from 'react';
import '../MedOfficeTemplate.css';

import doc3 from '../../images/doctor3.jpg'; // https://unsplash.com/

const Services = () => {
  const [imageReady, setImageReady] = React.useState(false);

  // Side effect to preload image
  React.useEffect(() => {
    const img = new Image();
    img.src = doc3;
    
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
          <div className="BG servicesBG"></div>
          <div className="medContentContainer">
            <h2>Services we provide</h2>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Services;