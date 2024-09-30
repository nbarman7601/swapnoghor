import { Link, useNavigate } from "react-router-dom"
import { MainHeader } from "./MainHeader"
import { NavLinks } from "./NavLinks"
import './MainNavigation.css';

export const MainNavigation = ()=>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear();
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
                    Finance
                </Link>
            </div>
            <nav>
                <NavLinks />
            </nav>
            <nav className="user_setting_profile">
                <div data-testid="appName"> 
                    Nandan
                </div>
                <div className="logout">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </MainHeader>
    )
}