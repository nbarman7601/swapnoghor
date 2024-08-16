import React from 'react';

const CurrencyFormatter = ({ amount }) => {
  return <span>{amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>;
};

export default CurrencyFormatter;