import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { setUser, user, setSecret } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logOut = () => {
        setUser(false); //secret is deleted in AuthProvider
    }

    return (
        <>
            <nav className="navbar  bg-secondary-emphasis" style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">
                        Horhoria
                    </NavLink>

                    <div className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} style={{ position: "relative" }}>
                        <a className="navbar-brand" role="button" data-bs-toggle="dropdown" aria-expanded={isDropdownOpen}>
                            Kategoriler
                        </a>
                        <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                            <li><NavLink className="dropdown-item" to="categories/deneme" >Deneme</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/categories/category2">Kategori 2</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/categories/category3">Kategori 3</NavLink></li>
                        </ul>
                    </div>

                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Aradığınız Ürünü Yazınız"
                            aria-label="Search"
                            style={{ width: 400 }}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    navigate("/products?title=" + search)
                                }
                            }}
                        />
                        <NavLink to={"/products?title=" + search} className="btn btn-outline-primary">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </form>

                    {user ? (
                        <>
                            <NavLink className="navbar-brand" to="/profile"> Profil</NavLink>
                            <NavLink className="navbar-brand" to="/cart"> Sepetim</NavLink>
                            <NavLink className="navbar-brand" to="/" onClick={(e) => { logOut(); }}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className="navbar-brand" to="/profile"> Giriş Yap</NavLink>
                            <NavLink className="navbar-brand" to="/auth/register"> Kayıt Ol</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
