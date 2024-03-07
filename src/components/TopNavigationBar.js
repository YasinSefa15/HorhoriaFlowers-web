import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import CategoriesDropdown from "../views/user/home/components/CategoriesDropdown";
import CustomButton from "./CustomButton";
import "./TopNavigationBar.css";


export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {user, isAdmin} = useAuth();

    useEffect(() => {
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
                                            navigate("/products?title=" + search + "&page=1&onStock=0", {
                                                replace: true,
                                                state: {title: search, page: 1}
                                            })
                                        }
                                    }}
                                />
                            </div>
                            <div className=" col-sm-2 ps-2">
                                <CustomButton
                                    type={"button"}
                                    style={{borderRadius: "6px", width: "80%"}}
                                    text={<i className="fa-solid fa-magnifying-glass"></i>}
                                    onClick={() => navigate("/products?title=" + search + "&page=1&onStock=0", {
                                        replace: true,
                                        state: {title: search, page: 1}
                                    })}
                                ></CustomButton>
                            </div>
                        </form>
                    </div>


                    {user ? (

                        <>
                            {isAdmin ? (
                                    <>
                                        < button className="navbar-toggler col-2" type="button" data-bs-toggle="collapse"
                                                 data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                                 aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>

                                        <div className="collapse navbar-collapse row col col-sm-4" id="navbarNavAltMarkup">
                                            <div className="navbar-nav col d-flex justify-content-end">
                                                <div
                                                    className="d-flex align-items-center justify-content-center m-sm-0 me-lg-3 me-xl-4">
                                                    <CategoriesDropdown></CategoriesDropdown>
                                                </div>

                                                <div
                                                    className={"navbar-item cursor-pointer"}
                                                    onClick={() => {
                                                        navigate("/admin")
                                                    }}
                                                >
                                                    <div className={"d-flex align-items-center justify-content-center"}>
                                                        <div className="navbar-brand me-2">Kontrol Paneli</div>
                                                        <i className="fa-solid fa-shop"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        < button className="navbar-toggler col-2" type="button"
                                                 data-bs-toggle="collapse"
                                                 data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                                 aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>

                                        <div className="collapse navbar-collapse row col col-sm-4"
                                             id="navbarNavAltMarkup">
                                            <div className="navbar-nav col d-flex justify-content-end">
                                                <div
                                                    className="d-flex align-items-center justify-content-center m-sm-0 me-lg-3 me-xl-4">
                                                    <CategoriesDropdown></CategoriesDropdown>
                                                </div>

                                                <div
                                                    className={"navbar-item cursor-pointer m-sm-0 me-lg-3 me-xl-4"}
                                                    onClick={() => {
                                                        navigate("/cart")
                                                    }}
                                                >
                                                    <div className={"d-flex align-items-center justify-content-center"}>
                                                        <div className="navbar-brand  me-2">Sepetim</div>
                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                    </div>
                                                </div>

                                                <div
                                                    className={"navbar-item cursor-pointer"}
                                                    onClick={() => {
                                                        navigate("/profile")
                                                    }}
                                                >
                                                    <div className={"d-flex align-items-center justify-content-center"}>
                                                        <div className="navbar-brand me-2">Profilim</div>
                                                        <i className="fa-solid fa-user"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }


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
                                        className="d-flex align-items-center justify-content-center m-sm-0 me-lg-3 me-xl-4">
                                        <CategoriesDropdown></CategoriesDropdown>
                                    </div>

                                    <div
                                        className={"navbar-item cursor-pointer m-sm-0 me-lg-3 me-xl-4"}
                                        onClick={() => {
                                            navigate("/profile")
                                        }}
                                    >
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <div className="navbar-brand me-2"> Giriş Yap</div>
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                        </div>
                                    </div>

                                    <div
                                        className={"navbar-item cursor-pointer"}
                                        onClick={() => {
                                            navigate("/cart")
                                        }}
                                    >
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <div className="navbar-brand me-2">Sepetim</div>
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
    )
        ;
}
