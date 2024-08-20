import React from 'react';

const CurrencyFormatter = ({ amount }) => {
  return <span>{ amount ? amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' }): '0'.toLocaleString('en-US', { style: 'currency', currency: 'INR' }) }</span>;
};

export default CurrencyFormatter;