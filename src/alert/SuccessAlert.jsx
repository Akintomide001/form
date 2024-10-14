// Modal.js
import React from 'react';
import toddler from "../images/toddler.png"
import "../styles/alert.css"
function SuccessAlert({ isOpen, onClose }) {
  if (!isOpen) {
    return null;  // If modal is not open, return null (don't display it)
  }

  return (
    <div style={modalStyles}>
      <div className='modalContentStyles'>
        <div>
          <img src={toddler} alt='' className='spanImage' />
        </div>
        <h2 className='mesesageH'>Hurray!!!!!!</h2>
        <div className='messagePA'>We are expecting you 😉 </div>
        <button onClick={onClose} className='buttonStyles'>Bye...</button>
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
  padding: '5px',
  borderRadius: '10px',
  textAlign: 'center',
  height: 'fit-content',
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SuccessAlert;