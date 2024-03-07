import React, {useEffect, useRef, useState} from "react";
import "./Sidebar.css"; // Eğer bir CSS dosyanız varsa, onu burada içe aktarın.
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import {useAuth} from "../../../../context/AuthContext";
import CustomButton from "../../../../components/CustomButton";

function Sidebar() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {setSecret, setUser} = useAuth()
    const [activeItem, setActiveItem] = useState("Ana Sayfa");
    const navigate = useNavigate();
    const hoveredItem = useRef(null);

    const mapping = {
        "Ana Sayfa": "/admin",
        "Siparişler": "/admin/orders",
        "Müşteri": "/admin/users",
        "Ürünler": "/admin/products",
        "İstatistikler": "/admin/statistics",
        "Kategoriler": "/admin/categories",
        "Çıkış Yap": "/admin/logout"
    }

    useEffect(() => {
        // sayfa yenilendiğinde hangi sayfada olduğumuzu belirlemek için kullanıyoruz.
        const path = window.location.pathname;
        const item = path.split("/")[2];
        if (item) {
            const key = Object.keys(mapping).find(key => mapping[key] === path);
            setActiveItem(key);
        }
    }, []);

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
                        navigate(mapping["Ana Sayfa"]);
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
                        navigate(mapping["Siparişler"]);
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
                        navigate(mapping["Müşteri"]);
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Müşteri" ? "selected" : ""}`}>
                        <i className="fas fa-users me-md-2"></i>
                        <span className="d-none d-md-block">Üyeler</span>
                    </div>
                </div>

                <div
                    id="Ürünler"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Ürünler";
                        handleMouseEnter("Ürünler");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Ürünler");
                    }}
                    onClick={() => {
                        handleItemClick("Ürünler");
                        navigate(mapping["Ürünler"]);
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Ürünler" ? "selected" : ""}`}>
                        <i className="fas fa-cube me-md-2"></i>
                        <span className="d-none d-md-block">Ürünler</span>
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
                        navigate(mapping["İstatistikler"]);
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "İstatistikler" ? "selected" : ""}`}>
                        <i className="fa-solid fa-chart-line me-md-2"></i>
                        <span className="d-none d-md-block">İstatistikler</span>
                    </div>
                </div>

                <div
                    id="Kategoriler"
                    className="sidebar-item"
                    onMouseEnter={(e) => {
                        hoveredItem.current = "Kategoriler";
                        handleMouseEnter("Kategoriler");
                    }}
                    onMouseLeave={(e) => {
                        handleMouseLeave("Kategoriler");
                    }}
                    onClick={() => {
                        handleItemClick("Kategoriler");
                        navigate(mapping["Kategoriler"]);
                    }}>
                    <div
                        className={`list-item d-flex align-items-center ${activeItem === "Kategoriler" ? "selected" : ""}`}>
                        <i className="fas fa-list me-md-2"></i>
                        <span className="d-none d-md-block">Kategoriler</span>
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
