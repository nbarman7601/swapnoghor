import { Link, useNavigate } from "react-router-dom"
import { MainHeader } from "./MainHeader"
import { NavLinks } from "./NavLinks"
import './MainNavigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetLoan } from "../store/actions/loan.action";

export const MainNavigation = ()=>{
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        setUser(userInfo);
    },[])
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear();
        dispatch(resetLoan())
        navigate('/login');
    }

    return (
        <MainHeader>
            <button className="main_navigation_menu-btn">
                <span/>
                <span/>
                <span/>
            </button>
            <div className="main_navigation__title">
                <Link to={`/`}>
                    <img src={`./../sajhghor-logo.png`} alt="Logo" width={`auto`} height={`35px`}/>
                    {/* <img src={`./../white-logo.png`} alt="Logo" width={`auto`} height={`35px`}/>  */}
                    {/* <img src={`./../swapnoghor-logo.png`} alt="Logo" width={`auto`} height={`35px`}/> */}
                </Link> 
            </div>
            <nav>
                <NavLinks />
            </nav>
            <nav className="user_setting_profile">
                <div className="userLog" data-testid="appName"> 
                    {
                        user?.firstName
                    }
                    &nbsp;
                    <FontAwesomeIcon icon={faCaretDown}/>
                    <ul className="user_link">
                        <li>
                            <Link to={`my-profile`}>My Profile</Link>
                        </li>
                        <li onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOut} /></li>
                   </ul>
                </div>
                
            </nav>
        </MainHeader>
    )
}