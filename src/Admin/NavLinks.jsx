import { faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"

export const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li className="due_link">
                <NavLink
                    to="/due"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Due &nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
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
            <li>
                <NavLink
                    to="/loan"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Balance Sheet</NavLink>
            </li>
            <li>
                <NavLink
                    to="/calendar"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Calendar</NavLink>
            </li>
            <li>
                <NavLink
                    to="/customer"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Admission</NavLink>
            </li>
            <li>
                <NavLink
                    to="/group"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Group</NavLink>
            </li>
            <li>
                <NavLink
                    to="/items"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Items</NavLink>
            </li>
            <li>
                <NavLink
                    to="/employee"
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >Employee</NavLink>
            </li>
            <li>
                <NavLink
                    to={`/collection`}
                    className={({ isActive }) => (isActive ? 'activenav' : '')}
                >
                    Collection
                </NavLink>
            </li>

        </ul>
    )
}