import {useAuth} from "../../../../context/AuthContext";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import "./LoginPage.css"
import axios from "axios";
import {api_helper} from "../../../../helpers/api_helper";
import HTTPNotificationHelper from "../../../../helpers/HTTPNotificationHelper";
import React from "react";
import {Helmet} from "react-helmet";

export default function LoginPage() {
    const {user, secret, handleLogin, setSecret} = useAuth()
    const navigate = useNavigate()


    React.useEffect(() => {
        console.log("----login page.js")
        console.log(user)
        if (user !== false && secret !== null) {
            navigate("/")
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await axios.post(api_helper.api_url + api_helper.auth.login, formData);
            if (response.status === 200) {
                await handleLogin(response.data)

                //setSecret(response.data.token)

                navigate("/")

                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message
                })
            } else {
                console.log("e")
            }
        } catch (error) {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
                message: "E-posta ve/veya şifreniz hatalı",
            })
        }
    };

    return (
        <>
            <Helmet>
                <title>Hooria E-Ticaret - Giriş Yap</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformuna giriş yapın. Hesabınıza erişim sağlayın, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!"
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            <div className="center">
                <h1>Giriş Yap</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="type" required name="email">
                        </input>
                        <label>E-posta</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required name="password">
                        </input>
                        <label>Şifre</label>
                    </div>

                    <NavLink to="/auth/forgot-password" className="pass">Şifremi Unuttum</NavLink>

                    <input type="submit" value="Giriş Yap">
                    </input>

                    <div className="signup_link">
                        Hesabınız yok mu?
                        <NavLink to="/auth/register">Kayıt Ol</NavLink>
                    </div>
                    <div className="signup_link">
                        <NavLink to="/">Ana sayfaya dönmek için tıklayınız</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}