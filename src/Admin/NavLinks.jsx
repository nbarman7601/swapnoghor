import {  faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useUserRole } from "../common/hooks/useUserRole";

export const NavLinks = () => {
    const location = useLocation();
    const userRole = useUserRole();
    const isActive = ['/due/today', '/due/in-progress', '/due/overdue'].includes(location.pathname);
    return (
      <ul className="nav-links">
        <li className="due_link">
          <NavLink to="/due/today" className={isActive ? "activenav" : ""}>
            Due &nbsp;
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
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Balance Sheet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Admission
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/group"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Group
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Items
          </NavLink>
        </li>
        {userRole == "admin" && (
          <li>
            <NavLink
              to="/employee"
              className={({ isActive }) => (isActive ? "activenav" : "")}
            >
              Employee
            </NavLink>
          </li>
        )}
        {userRole == "admin" && (
          <li className="due_link">
            <NavLink
              to="/supplier"
              className={({ isActive }) => (isActive ? "activenav" : "")}
            >
              Supplier &nbsp;
              <FontAwesomeIcon icon={faCaretDown} />
            </NavLink>
            <ul className="sublink">
               <li>
                  <Link to={`/supplier`}>Supplier List</Link>
              </li>
              <li>
                <Link to={`/supplier/deposit`}>Deposit</Link>
              </li>
            </ul>
          </li>
        )}
        <li>
          <NavLink
            to={`/collection`}
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Collection
          </NavLink>
        </li>
      </ul>
    );
}