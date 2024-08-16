import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import './index.css';
import Breadcrumb from "../common/Breadcrumb";
import router from "../routes";
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
                       <Breadcrumb routes={router.routes} />
                      <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;