import React from "react";

export const Footer = () => (
    <div className="footer" data-testid="developer">
      <span>&copy; {new Date().getFullYear()}</span>&nbsp;
      <span>
        <a
          href="https://barmantech.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Barmantech Inc
        </a>
      </span>
    </div>
);
