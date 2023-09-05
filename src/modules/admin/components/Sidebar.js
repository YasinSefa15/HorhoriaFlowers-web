import React, {useRef, useState} from "react";
import "./Sidebar.css"; // Eğer bir CSS dosyanız varsa, onu burada içe aktarın.
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import CustomButton from "../../user/components/CustomButton";
import {useAuth} from "../../../context/AuthContext";

function Sidebar() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {setSecret, setUser} = useAuth()
    const [activeItem, setActiveItem] = useState("Ana Sayfa");
    const navigate = useNavigate();
    const hoveredItem = useRef(null);

    const handleMouseEnter = (item) => {
        if (hoveredItem.current) {
            const hoverItem = document.getElementById("hoveredItem");
            hoverItem.classList.remove("d-none");
            const spanElement = hoverItem.querySelector("span"); // İçindeki <span> elementini buluyoruz.
            spanElement.innerText = item; // İçeriğini değiştiriyoruz.
            const element = document.getElementById(item).getBoundingClientRect();
            hoverItem.style.top = `${(element.top)}px`;
        }
    };

    const handleMouseLeave = (item) => {
        const hoverItem = document.getElementById("hoveredItem");
        hoverItem.classList.add("d-none");
        hoveredItem.current = null;
    };
    const handleItemClick = (item) => {
        //setActiveItem(activeItem === item ? null : item);
        setActiveItem(item);
    };

    return (
        <>
            <div className="sidebar">

                <div
                    id="Ana Sayfa"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Ana Sayfa";
                        handleMouseEnter("Ana Sayfa");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Ana Sayfa");
                    }}
                    onClick={() => {
                        handleItemClick("Ana Sayfa");
                        navigate("/admin");
                    }}>

                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Ana Sayfa" ? "selected" : ""}`}>
                        <i className="fas fa-home me-md-2"></i>
                        <span className="d-none d-md-block me-5">Ana Sayfa</span>
                    </div>
                </div>

                <div
                    id="Siparişler"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Siparişler";
                        handleMouseEnter("Siparişler");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Siparişler");
                    }}
                    onClick={() => {
                        handleItemClick("Siparişler");
                        navigate("/admin/orders");
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Siparişler" ? "selected" : ""}`}>
                        <i className="fas fa-cart-arrow-down me-md-2"></i>
                        <span className="d-none d-md-block">Siparişler</span>
                    </div>
                </div>

                <div
                    id="Müşteri"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Müşteri";
                        handleMouseEnter("Müşteri");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Müşteri");
                    }}
                    onClick={() => {
                        handleItemClick("Müşteri");
                        navigate("/admin/users");
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Müşteri" ? "selected" : ""}`}>
                        <i className="fas fa-users me-md-2"></i>
                        <span className="d-none d-md-block">Üyeler</span>
                    </div>
                </div>

                <div
                    id="Depo"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Depo";
                        handleMouseEnter("Depo");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Depo");
                    }}
                    onClick={() => {
                        handleItemClick("Depo");
                        navigate("/admin/stock");
                    }}>
                    <div className={`list-item d-flex align-items-center ${activeItem === "Depo" ? "selected" : ""}`}>
                        <i className="fas fa-cube me-md-2"></i>
                        <span className="d-none d-md-block">Depo</span>
                    </div>

                </div>

                <div
                    id="İstatistikler"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "İstatistikler";
                        handleMouseEnter("İstatistikler");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("İstatistikler");
                    }}
                    onClick={() => {
                        handleItemClick("İstatistikler");
                        navigate("/admin/statistics");
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "İstatistikler" ? "selected" : ""}`}>
                        <i className="fa-solid fa-chart-line me-md-2"></i>
                        <span className="d-none d-md-block">İstatistikler</span>
                    </div>
                </div>

                <div
                    id="Profilim"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Profilim";
                        handleMouseEnter("Profilim");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Profilim");
                    }}
                    onClick={() => {
                        handleItemClick("Profilim");
                        navigate("/admin/profile");
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Profilim" ? "selected" : ""}`}>
                        <i className="fa-solid fa-user me-md-2"></i>
                        <span className="d-none d-md-block">Profilim</span>
                    </div>
                </div>

                <div
                    id="Çıkış Yap"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Çıkış Yap";
                        handleMouseEnter("Çıkış Yap");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Çıkış Yap");
                    }}
                    onClick={() => {
                        handleItemClick("Çıkış Yap");
                        setShowLogoutModal(true)
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Çıkış Yap" ? "selected" : ""}`}>
                        <i className="fas fa-sign-out-alt me-md-2"></i>
                        <span className="d-none d-md-block">Çıkış Yap</span>
                    </div>
                </div>
            </div>
            <div
                className="d-flex d-md-none d-block spec-hover"
                id={"hoveredItem"}>
                <span></span>
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
                                await setUser(null)
                                await navigate("/");
                            };
                            fetchData().then(r => {
                            });
                        }}
                        status="danger"
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Sidebar;
