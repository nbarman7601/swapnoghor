import { Outlet } from "react-router-dom"
import './index.css';
import Breadcrumb from "../common/Breadcrumb";
import router from "../routes";
import { MainNavigation } from "./MainNavigation";
import { Footer } from "./Footer";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
const Admin = () => {
    const {error, display} = useSelector((state)=> state.global);
    return (
        <React.Fragment>
            <div className="admin-layout">
                <div className="main">
                    <MainNavigation />
                    <div className="layout">
                        <div className="content_layout">
                            <Breadcrumb routes={router.routes} />
                            {
                                display && (<div className="error-container">
                                            {error}
                                    </div>)
                            }
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