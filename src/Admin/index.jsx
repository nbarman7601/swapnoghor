import { Outlet } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import './index.css';
import Breadcrumb from "../common/Breadcrumb";
import router from "../routes";
import { MainNavigation } from "./MainNavigation";
import { Footer } from "./Footer";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer />
        </React.Fragment>
    )
}

export default Admin;