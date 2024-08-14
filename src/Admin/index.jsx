import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import './index.css';
const Admin = () => {
    return (
        <div className="admin-layout">
            <div className="main">
                <Header />
                <div className="layout">
                    <div className="sidebar_layout">
                       <Sidebar />
                    </div>
                    <div className="content_layout">
                      <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;