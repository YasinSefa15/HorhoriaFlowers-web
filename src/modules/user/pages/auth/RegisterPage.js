import {useAuth} from "../../../../context/AuthContext";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {api_helper} from "../../../../helpers/api_helper";
import HTTPNotificationHelper from "../../../../helpers/HTTPNotificationHelper";
import React from "react";
import {Helmet} from "react-helmet";

export default function RegisterPage() {
    const navigate = useNavigate()
    const {user} = useAuth()


    React.useEffect(() => {
        if (user) {
            navigate("/products?title=&page=1")
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await axios.post(api_helper.api_url + api_helper.auth.register, formData);
            console.log(response)
            if (response.status === 201) {
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                    message: "Giriş işlemi gerekli",
                })
                navigate("/auth/login")
            } else {
                console.log("e")
            }
        } catch (error) {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
        }
    };

    return (
        <>
            <Helmet>
                <title>Hooria E-Ticaret - Kayıt Ol</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda kayıt olun. Hesap oluşturarak indirimlerden yararlanın, hızlı alışveriş deneyimi yaşayın ve geniş ürün yelpazemizle ihtiyacınız olan her şeyi keşfedin!"
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            <div className="center">
                <h1>Kayıt Ol</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="txt_field">
                                <input type="type" required name="first_name">
                                </input>
                                <span></span>
                                <label>Ad</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="txt_field">
                                <input type="type" required name="last_name">
                                </input>
                                <span></span>
                                <label>Soyad</label>
                            </div>
                        </div>
                    </div>
                    <div className="txt_field">
                        <input type="type" required name="phone">
                        </input>
                        <label>Telefon Numarası</label>
                    </div>
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
                    <div className="txt_field">
                        <input type="password" required name="password_confirmation">
                        </input>
                        <label>Şifrenizi tekrar giriniz</label>
                    </div>

                    <input type="submit" value="Kayıt Ol">
                    </input>

                    <div className="signup_link">
                        Hesabınız var mı?
                        <NavLink to="/auth/login">Giriş Yap</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}