import React from 'react';

const TruncateText = ({ text, limit = 30 }) => {
  const truncatedText = text.length > limit ? text.substring(0, limit) + '...' : text;
  return <span>{truncatedText}</span>;
}; 

export default TruncateText;
