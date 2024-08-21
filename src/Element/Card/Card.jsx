import React from 'react';
import './Card.css'; // Optional: For styling

const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
