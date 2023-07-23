import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminTopNavBar() {
    return (
        <>
            <nav className="navbar "
                 style={{
                     paddingTop: "20px",
                     paddingLeft: "20px",
                     paddingRight: "20px",
                     backgroundColor: "#e3f2fd",
                     marginBottom: "20px"
                 }}
            >
                <div className="container-fluid ">

                    <NavLink
                        to={"/admin/products"}
                        className="navbar-brand"
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to={"/admin/categories"}
                        className="navbar-brand"
                    >
                        Categories
                    </NavLink>
                </div>


            </nav>
        </>
    )
}