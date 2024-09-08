import { Link } from "react-router-dom"
import { MainHeader } from "./MainHeader"
import { NavLinks } from "./NavLinks"
import './MainNavigation.css';

export const MainNavigation = ()=>{
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
                <div>
                    Nandan
                </div>
            </nav>
        </MainHeader>
    )
}