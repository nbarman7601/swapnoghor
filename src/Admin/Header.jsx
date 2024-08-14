import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
     localStorage.clear();
     navigate('/')
  }
  return (
    <div className="header">
            <div className='profile__toolbar'>
                <Link to="/admin/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button> 
            </div>
    </div>
  );
};

export default Header;
