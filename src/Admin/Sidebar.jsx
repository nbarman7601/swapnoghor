import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin </h3>
      <ul>
        
        <li><Link to="/admin/employee">Employee</Link></li>
        <li><Link to="/admin/group">Group</Link></li>
        <li><Link to="/admin/customer">Customer</Link></li>
        <li><Link to="/admin/loan">Loan</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
