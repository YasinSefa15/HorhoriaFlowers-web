import {NavLink, Outlet} from "react-router-dom";
import AdminTopNavBar from "../../components/admin/AdminTopNavBar";

export default function AdminLayout() {
    return (
        <>
            <AdminTopNavBar/>
            <Outlet/>
        </>
    )
}