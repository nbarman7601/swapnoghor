import { NavLink } from "react-router-dom"

export const NavLinks = ()=>{
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/loan">Loan</NavLink>
            </li>
            <li>
                <NavLink to="/calendar">Calendar</NavLink>
            </li>
            <li>
                <NavLink to="/customer">Customer</NavLink>
            </li>
            <li>
                <NavLink to="/group">Group</NavLink>
            </li>
            <li>
                <NavLink to="/items">Items</NavLink>
            </li>
            <li>
                <NavLink to="/employee">Employee</NavLink>
            </li>
        </ul>
    )
}