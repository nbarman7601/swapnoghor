import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Popover = ({ x, y, items, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ul
      ref={menuRef}
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        listStyle: 'none',
        zIndex: 1000,
        width: '100px',
      }}
    >
      {items.map((item, index) => (
        <li key={index} style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={item.onClick}>
          {item.label}
        </li>
      ))}
    </ul>,
     document.body
  );
};

export default Popover;
