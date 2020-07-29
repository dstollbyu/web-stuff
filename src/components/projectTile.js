import React from 'react';
import { Link } from 'react-router-dom';

// ProjectTile component that displays information and link about a completed project
const ProjectTile = ({ name, icon, link, target, info }) => {
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <div className="projectTile">
        {/* wrap the anchor tag around the div so that most of the tile can be highlighted to work as a link */}
        <Link to={link}>
          <div className="projectLink">
              {/* Create image from svg and path */}
              {icon}
              <h3>{name}</h3>
          </div>
        </Link>
        <div className="bottomBarOfProjectTile">
          <span style={{width: '100%'}} height="24"><Link to={link}><div style={{height: '100%'}}>&nbsp;</div></Link></span>
          <div className="projectInfo" onClick={() => {setModal(!modal)}}>
            <InfoIcon target={target} />
          </div>
          {/* https://www.digitalocean.com/community/tutorials/react-modal-component for modals in react */}
          <Modal show={modal} handleClose={() => setModal(!modal)} info={info} name={name} />
        </div>
      </div>
    </>
  )
  
};

// Modal component that handles the popup when clicking the info icon
const Modal = ({ handleClose, show, info, name }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  // If "ESC" is pressed, it exits the modal window
  const escFunction = (event) => {
    if (event.keyCode === 27) { 
      handleClose();
    }
  }

  // If the mouse is clicked outside of the modal window while it is open, the modal will close
  const handleClick = (event) => {
    if (event.target.className === "modal display-block") {
      handleClose();
    }
  }

  // Side-effect that handles the ESC press or click out of modal window
  React.useEffect(() => {
    if (show) {
      window.addEventListener('keydown', escFunction);
      window.addEventListener('click', handleClick)
      return (() => {
        window.removeEventListener('keydown', escFunction);
        window.removeEventListener('click', handleClick);
      })
    }
  })

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <span className="close" onClick={handleClose}>&times;</span>
        <div className="modal-header">  
          <h1>{name}</h1>
        </div>
        {info}
        <div className="modal-footer">
          <button onClick={handleClose}>close</button>
        </div>
      </section>
    </div>
  )
};

// InfoIcon component that uses the info svg and takes a target argument
const InfoIcon = ({ target }) => {
  return (
    <svg style={{cursor:'pointer'}} width="24" height="24" viewBox="0 0 16 16" data-toggle="modal" data-target={target}>
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
      <circle cx="8" cy="4.5" r="1"/>
    </svg>    
  )
}

export default ProjectTile;