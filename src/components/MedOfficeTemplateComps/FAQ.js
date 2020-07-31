import React from 'react';
import '../MedOfficeTemplate.css';

import doc4 from '../../images/doctor4.jpg'; // https://unsplash.com/

const FAQ = () => {
  const [imageReady, setImageReady] = React.useState(false);

  // Side effect to preload image
  React.useEffect(() => {
    const img = new Image();
    img.src = doc4;
    
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
          <div className="BG faqBG"></div>
          Lorem ipsum
        </div>
      </>
    )
  }
}

export default FAQ;