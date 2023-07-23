import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";


export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {setUser, user} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logOut = () => {
        setUser(false); //secret is deleted in AuthProvider
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    paddingTop: "20px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f8f7f7",
                }}>

                <div className="container-fluid row  ">

                    <NavLink
                        to="/"
                        className="navbar-brand col-4 col-md-2"
                    >
                        Horhoria
                    </NavLink>


                    <form
                        className="d-flex col-md-6 justify-content-center align-items-center"
                        role="search"
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Aradığınız Ürünü Yazınız"
                            aria-label="Search"
                            style={{width: 400}}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    navigate("/products?title=" + search)
                                }
                            }}
                        />
                        <NavLink to={"/products?title=" + search} className="btn btn-outline-primary ">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </form>


                    {user ? (
                        <>
                            <NavLink className="navbar-brand col-sm-1" to="/profile"> Profil</NavLink>
                            <NavLink className="navbar-brand col-sm-1" to="/cart"> Sepetim</NavLink>
                            <NavLink className="navbar-brand col-sm-1" to="/" onClick={(e) => {
                                logOut();
                            }}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div
                                className="collapse navbar-collapse col-md-4 row " id="navbarSupportedContent"
                            >
                                <ul
                                    className="navbar-nav me-auto mb-2 mb-lg-0 "
                                >
                                    <li className="nav-item col-md-4 ">
                                        <div className="dropdown " onMouseEnter={() => setIsDropdownOpen(true)}
                                             onMouseLeave={() => setIsDropdownOpen(false)}
                                             style={{position: "relative"}}>
                                            <a className="navbar-brand" role="button" data-bs-toggle="dropdown"
                                               aria-expanded={isDropdownOpen}>
                                                Kategoriler
                                            </a>
                                            <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                                                <li><NavLink className="dropdown-item"
                                                             to="/categories/deneme">Deneme</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/categories/category2">Kategori
                                                    2</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/categories/category3">Kategori
                                                    3</NavLink></li>
                                            </ul>
                                        </div>


                                    </li>

                                    <li className="nav-item col-md-4 ">
                                        <NavLink className="navbar-link" to="/profile"
                                                 id="navbarSupportedContent"> Giriş Yap</NavLink>
                                    </li>
                                    <li className="nav-item col-md-4">

                                        <NavLink className="navbar-link" to="/auth/register"
                                                 id="navbarSupportedContent"> Kayıt Ol</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
