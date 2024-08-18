import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import './index.css';
import Breadcrumb from "../common/Breadcrumb";
import router from "../routes";
import { MainNavigation } from "./MainNavigation";
const Admin = () => {
    return (
        <div className="admin-layout">
            <div className="main">
                <MainNavigation />
                <div className="layout">
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