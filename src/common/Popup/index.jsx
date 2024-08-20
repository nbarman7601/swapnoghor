import React from 'react';
import './Popup.css'; // Optional: Add styling for the popup

const Popup = ({ children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
           {children}
      </div>
    </div>
  );
};

export default Popup;
