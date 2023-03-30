import {NavLink} from "react-router-dom";

export default function NavigationBar() {
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="container-fluid ">
                    <a className="navbar-brand">Navbar</a>
                    <a className="navbar-brand">Navbar</a>

                    <NavLink to="/profile"> Profil </NavLink>
                    <NavLink to="/"> Ana Sayfa </NavLink>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}