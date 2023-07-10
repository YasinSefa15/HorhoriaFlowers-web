import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";

export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {setUser,user} = useAuth();

    const logOut = () => {
        setUser(false);
    }

    return (
        <>
            <nav className="navbar bg-secondary-emphasis"
                 style={{
                     paddingTop: "20px",
                     paddingLeft: "20px",
                     paddingRight: "20px",
                 }}
            >
                <div className="container-fluid ">
                    <NavLink
                        to="/"
                        className="navbar-brand"
                    >
                        Horhoria
                    </NavLink>

                    <NavLink className="navbar-brand" to="/">Kategoriler </NavLink>


                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Aradığınız Ürünü Yazınız"
                            aria-label="Search"
                            style={{width: 400}}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && navigate("/products?title=" + search)}
                        />
                        <NavLink to={"/products?title=" + search} className="btn btn-outline-primary"><i
                            className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </form>


                    {((() => {
                        if (user) {
                            return (
                                <>
                                    <NavLink className="navbar-brand" to="/profile"> Profil</NavLink>
                                    <NavLink className="navbar-brand" to="/cart"> Sepetim</NavLink>
                                    <NavLink className="navbar-brand" to="/"
                                             onClick={(e) => {
                                                 logOut();
                                             }
                                             }>
                                        <i className="fa-solid fa-right-from-bracket" ></i>
                                    </NavLink>


                                </>
                            )
                        } else {
                            return (
                                <>
                                    <NavLink className="navbar-brand" to="/cart"> Sepetim</NavLink>
                                    <NavLink className="navbar-brand" to="/profile"> Giriş Yap</NavLink>
                                    <NavLink className="navbar-brand" to="/auth/register"> Kayıt Ol</NavLink>
                                </>
                            )
                        }
                    }))()}
                </div>
            </nav>
        </>
    )
}