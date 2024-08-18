import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <h3>Admin </h3> */}
      <ul>
        
        <li><Link to="/employee">Employee</Link></li>
        <li><Link to="/group">Group</Link></li>
        <li><Link to="/customer">Customer</Link></li>
        <li><Link to="/loan">Loan</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
