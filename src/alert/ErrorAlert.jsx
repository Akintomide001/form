// ErrorModal.js
import React from 'react';
import oops from "../images/oops.png"
import "../styles/alert.css"


function ErrorAlert({ isOpen, onClose, message }) {
  // if (!isOpen) {
  //   return null; // If modal is not open, return null (don't display it)
  // }

  return (
    <div style={modalStyles}>
      <div className="modalContentStyles">
        <div>
        <img src={oops} alt='' className='spanImage2' />
        </div>
        <h2 className='errorh'>Oooops!!!!!!!</h2>
        <p className='errorp' style={{color: 'black'}}>I think we have a little error</p>
        <button onClick={onClose} className='buttonStyle'>Let fix that</button>
      </div>
    </div>
  );
}

// Modal styling
const modalStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '30px 100px',
  borderRadius: '10px',
  textAlign: 'center',
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: '#f44336',
  color: 'white',
  font :'10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop:'20px',
};

export default ErrorAlert;
