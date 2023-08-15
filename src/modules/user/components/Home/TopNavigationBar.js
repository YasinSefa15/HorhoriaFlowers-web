import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import CategoriesDropdown from "./CategoriesDropdown";
import CustomButton from "../CustomButton";


export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {setUser, user} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        console.log("top user ", user)
    }, [user])

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

                <div className="container-fluid row">

                    <div className="col-4 col-sm-2 col-md-3">
                        <NavLink
                            to="/"
                            className="navbar-brand fw-bold"
                        >
                            Horhoria
                        </NavLink>
                    </div>

                    <div className={"col-4 col-sm-4 col-md-5 container"}>

                        <form
                            className="d-flex justify-content-center align-items-center "
                            role="search"
                        >
                            <div className="col-11 col-sm-10">
                                <input
                                    className="form-control me-2 "
                                    type="search"
                                    placeholder="Aradığınız Ürünü Yazınız"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            navigate("/products?title=" + search)
                                        }
                                    }}
                                />
                            </div>
                            <div className=" col-sm-2 ps-2">
                                <CustomButton
                                    type={"button"}
                                    style={{borderRadius: "6px", width: "80%"}}
                                    text={<i className="fa-solid fa-magnifying-glass"></i>}
                                    onClick={() => navigate("/products?title=" + search)}
                                ></CustomButton>
                            </div>
                        </form>
                    </div>


                    {user ? (
                        <>
                            <button className="navbar-toggler col-2" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row col col-sm-4" id="navbarNavAltMarkup">
                                <div className="navbar-nav col d-flex justify-content-end">
                                    <div
                                        className="d-flex align-items-center justify-content-center">
                                        <CategoriesDropdown></CategoriesDropdown>
                                    </div>

                                    <div
                                        className={" navbar-item cursor-pointer "}>
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <NavLink className="navbar-brand d-md-none d-lg-block"
                                                     to="/cart"> Sepetim</NavLink>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </div>
                                    </div>

                                    <div
                                        className={"navbar-item cursor-pointer"}>
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <NavLink className="navbar-brand d-md-none d-lg-block"
                                                     to="/profile"> Profil</NavLink>
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    ) : (
                        <>
                            <button className="navbar-toggler col-2" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row col col-sm-3" id="navbarNavAltMarkup">
                                <div className="navbar-nav col d-flex justify-content-end">
                                    <div
                                        className="d-flex align-items-center justify-content-center">
                                        <CategoriesDropdown></CategoriesDropdown>
                                    </div>

                                    <div
                                        className={"navbar-item cursor-pointer"}>
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <NavLink className="navbar-brand d-md-none d-lg-block"
                                                     to="/auth/login"> Giriş Yap</NavLink>
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                        </div>
                                    </div>

                                    <div
                                        className={"navbar-item cursor-pointer"}>
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <NavLink className="navbar-brand d-md-none d-lg-block"
                                                     to="/auth/login">Sepetim</NavLink>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}
                </div>
            </nav>
        </>
    );
}
