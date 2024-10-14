// ErrorModal.js
import React from 'react';

function ErrorAlert({ isOpen, onClose, message }) {
  if (!isOpen) {
    return null; // If modal is not open, return null (don't display it)
  }

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Error!</h2>
        <p style={{color: 'black'}}>ppppppppp</p>
        <button onClick={onClose} style={buttonStyles}>OK</button>
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
  padding: '100px',
  borderRadius: '10px',
  textAlign: 'center',
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop:'20px',
};

export default ErrorAlert;
