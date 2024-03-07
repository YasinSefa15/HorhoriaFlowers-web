import {NavLink} from "react-router-dom";
import "./footer.css";
import ShopierSvg from "../../../../assests/shopier_logo_1.svg";
import {colorSchema} from "../../../../utils/ColorSchema";

export default function Footer() {
    return (
        <>
            <div className="footer" style={{
                backgroundColor: colorSchema.footer.backgroundColor,
                color: colorSchema.footer.color,
                paddingTop: "50px",
                paddingBottom: "50px"
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3 className="title"><NavLink className="navbar-brand" to="/">Horhoria</NavLink></h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet odio lobortis
                                ipsum pretium, et scelerisque justo condimentum. Aliquam sollicitudin et neque eu
                                vestibulum. Fusce efficitur eu tellus vel bibendum. Ut aliquam tortor sed augue
                                tristique, tristique hendrerit mauris facilisis. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras lobortis,
                            </p>

                            <div className="footer-icons">
                                <i className="fa-brands fa-facebook"
                                   style={{cursor: "pointer"}}
                                   onClick={() => {
                                       window.open("https://www.facebook.com/horhoria", "_blank")
                                   }}
                                />
                                <i className="fa-brands fa-twitter"
                                   style={{cursor: "pointer"}}
                                   onClick={() => {
                                       window.open("https://www.facebook.com/horhoria", "_blank")
                                   }}
                                />
                                <i className="fa-brands fa-instagram"
                                   style={{cursor: "pointer"}}
                                   onClick={() => {
                                       window.open("https://www.facebook.com/horhoria", "_blank")
                                   }}
                                />
                                <img
                                    style={{
                                        width: "114px",
                                        backgroundColor: "#d5d5d5",
                                        borderRadius: "8%",
                                        padding: "1px",
                                        cursor: "pointer"
                                    }}
                                    src={ShopierSvg} alt="sda"
                                    onClick={() => {
                                        window.open("https://www.facebook.com/horhoria", "_blank")
                                    }}
                                />
                            </div>

                        </div>
                        <div className="col-md-6 col-lg-3 col-12">
                            <div className="quick-links ft-2">
                                <h5 className="title">Bağlantılar</h5>
                                <ul>
                                    <li><NavLink to="/about-us" className="link">Hakkımızda</NavLink></li>

                                    {/*<li><NavLink to="/terms" className="link">Şartlar ve Koşullar</NavLink></li>
                                    <li><NavLink to="/privacy" className="link">Gizlilik</NavLink></li>*/}
                                </ul>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-4 col-12">
                            <div className="contact-info ft-3">
                                <h5 className="title">İletişim Kanalları</h5>
                                <p><i className="fas fa-envelope"></i> horhoria@gmail.com</p>
                                <p><i className="fa-solid fa-paper-plane"></i> Fethiye/Türkiye</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}