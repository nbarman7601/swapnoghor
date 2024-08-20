import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import './index.css';
import Breadcrumb from "../common/Breadcrumb";
import router from "../routes";
import { MainNavigation } from "./MainNavigation";
import { Footer } from "./Footer";
import React from "react";
const Admin = () => {
    return (
        <React.Fragment>
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
            <Footer />
        </React.Fragment>
    )
}

export default Admin;