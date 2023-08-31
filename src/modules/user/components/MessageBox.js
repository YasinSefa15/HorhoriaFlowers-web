import CustomButton from "./CustomButton";
import {useNavigate} from "react-router-dom";

export default function MessageBox() {
    const navigate = useNavigate()
    return (
        <>
            <div className="message-overplay">
                <div className="order-message-box-error">
                    <h2 className="order-message-title">Giriş Eylemi Gerekli</h2>
                    <hr></hr>
                    <p className="order-message-text">Devam edebilmek için öncelikle giriş yapınız</p>
                    <CustomButton
                        text="Giriş Yap"
                        status="success"
                        style={{width: "max-content", marginTop: "10px"}}
                        onClick={() => navigate("/auth/login")}
                    ></CustomButton>
                </div>
            </div>
        </>
    )
}