import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import CustomButton from "../CustomButton";
import {useAuth} from "../../../../context/AuthContext";

export default function LeftSide() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {setSecret} = useAuth()
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

                <div className="cursor-pointer"
                     onClick={() => {
                         setShowLogoutModal(true)
                     }}>
                    <h5>Çıkış Yap</h5>
                </div>
            </div>

            <Modal show={showLogoutModal} onHide={() => {
                setShowLogoutModal(false)
            }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Çıkış Yap</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="row">
                                <div className="row">
                                    <div className="col">Çıkış yapmak istediğiniz emin misiniz?</div>
                                </div>
                            </div>
                            <br></br>

                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowLogoutModal(false)
                        }}
                    >
                    </CustomButton>

                    <CustomButton
                        text="Çıkış Yap"
                        onClick={() => {
                            setShowLogoutModal(false)
                            const fetchData = async () => {
                                await setSecret(null)
                            };
                            fetchData().then(r => {
                            });
                        }}
                        status="danger"
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>)
}