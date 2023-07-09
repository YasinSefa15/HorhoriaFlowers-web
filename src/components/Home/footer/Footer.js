import {NavLink, useLocation, useNavigate} from "react-router-dom";

//imprt footer.css
import "./footer.css";

export default function Footer() {
    return (
        <>
            <div className="footer">
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
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                            </div>

                        </div>
                        <div className="col-md-6 col-lg-3 col-12">
                            <div className="quick-links ft-2">
                                <h5 className="title">Quick Links</h5>
                                <ul>
                                    <li><NavLink to="/about" className="link">About</NavLink></li>
                                    <li><NavLink to="/contact" className="link">Contact</NavLink></li>
                                    <li><NavLink to="/terms" className="link">Terms</NavLink></li>
                                    <li><NavLink to="/privacy" className="link">Privacy</NavLink></li>
                                </ul>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-4 col-12">
                            <div className="contact-info ft-3">
                                <h5 className="title">Contact Info</h5>
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