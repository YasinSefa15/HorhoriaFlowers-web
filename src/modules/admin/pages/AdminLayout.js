import {NavLink, Outlet} from "react-router-dom";
import AdminTopNavBar from "../components/AdminTopNavBar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div
                    className=" me-0 d-flex"
                >
                    <div className="sidebar-container col col-1 ">
                        <Sidebar/>
                    </div>
                    <div className="col p-0 outlet pt-2 ps-4 pe-4">
                        <Outlet/>
                    </div>

                </div>

            </div>
        </>
    )
}