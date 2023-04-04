import {NavLink, Outlet} from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            <NavLink
                to={"/admin/products"}
            >
                Products
            </NavLink>

            <NavLink
                to={"/admin/categories"}
            >
                Categories
            </NavLink>
            <Outlet/>
        </>
    )
}