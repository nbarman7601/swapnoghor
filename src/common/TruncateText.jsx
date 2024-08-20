import React from 'react';

const TruncateText = ({ text }) => {
  const truncatedText = text.length > 30 ? text.substring(0, 30) + '...' : text;
  return <span>{truncatedText}</span>;
};

export default TruncateText;
