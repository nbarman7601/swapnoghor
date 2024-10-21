import { faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"

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
            <li className="due_link">
                <NavLink to="#">Due &nbsp;
                    <FontAwesomeIcon icon={faCaretDown}/>
                </NavLink>
                <ul className="sublink">
                    <li>
                        <Link to={`/due/today`}>Today's Due</Link>
                    </li>
                    <li>
                        <Link to={`/due/in-progress`}>In Progress</Link>
                    </li>
                    <li>
                        <Link to={`/due/overdue`}>Overdue</Link>
                    </li>
                </ul>
            </li>
        </ul>
    )
}