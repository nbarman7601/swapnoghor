import React from 'react';
import './Card.css'; // Optional: For styling

const Card = ({ children, className, title }) => {
  return (
    <div className={`card ${className}`}>
      {
        title && <h3 className={'title'}>{title}</h3>
      }
      {children}
    </div>
  );
};

export default Card;
