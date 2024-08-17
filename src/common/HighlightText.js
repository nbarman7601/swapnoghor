import React from 'react';
import './common.css';  // Import the CSS file

const HighlightText = ({ text, searchInput }) => {
    if (!searchInput) {
        return <div>{text}</div>;
    }

    // Create a regular expression to find the matching text (case-insensitive)
    const regex = new RegExp(`(${searchInput})`, 'gi');
    
    // Split the text by the matching search input
    const parts = text.split(regex);

    return (
        <div>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span key={index} className="highlight">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </div>
    );
};

export default HighlightText;
