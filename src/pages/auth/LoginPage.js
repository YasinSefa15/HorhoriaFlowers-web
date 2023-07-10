import {useAuth} from "../../context/AuthContext";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import "./LoginPage.css"
import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import NotificationHelper from "../../helpers/NotificationHelper";

export default function LoginPage() {
    const {setUser,setSecret} = useAuth()
    const navigate = useNavigate()
    const location = useLocation() //

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await axios.post(api_helper.api_url + api_helper.auth.login, formData);
            console.log(response)
            if (response.status === 200) {
                const data = response.data.data
                setUser({
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                })
                setSecret(response.data.token)
                navigate(location?.state?.return_url || "/")
                NotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message
                })
            } else {
                console.log("e")
            }
        } catch (error) {
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
                message: "E-posta ve/veya şifreniz hatalı",
            })
        }
    };

    return (
        <>
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
                </form>
            </div>
        </>
    )
}