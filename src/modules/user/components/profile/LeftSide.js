import {NavLink} from "react-router-dom";
import React from "react";

export default function LeftSide() {
    return (
        <>
            <div
                className="profile-left col align-self-start col-12 col-sm-12 col-md-2 mb-5"
            >
                <div className="">
                    <NavLink to={"/profile"}>
                        <h5>Profil Bilgilerim</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/change-password"}>
                        <h5>Şifre Değiştir</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/email-operations"}>
                        <h5>Email Adresi Değiştir/Onayla</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/orders"}>
                        <h5>Siparişlerim</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/addresses"}>
                        <h5>Kayıtlı Adreslerim</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/coupons"}>
                        <h5>Kuponlarım</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/shipping-status"}>
                        <h5>Kargom Nerede</h5>
                    </NavLink>
                </div>

                <hr></hr>

                <div className="">
                    <NavLink to={"/profile/shipping-status"}>
                        <h5>Çıkış Yap</h5>
                    </NavLink>
                </div>
            </div>
        </>)
}