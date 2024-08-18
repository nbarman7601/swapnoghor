import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Button from '../Element/Button';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
     localStorage.clear();
     navigate('/')
  }
  return (
    <div className="header">
            <Sidebar />
            <div className='profile__toolbar'>
                <Link to="/profile">Profile</Link>
                <Button onClick={handleLogout} className={`flat-btn`}>Logout</Button> 
            </div>
    </div>
  );
};

export default Header;
