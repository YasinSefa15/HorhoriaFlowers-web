import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";
import {useAuth} from "../../../context/AuthContext";
import {api_helper} from "../../../utils/api_helper";
import HTTPNotificationHelper from "../../../utils/HTTPNotificationHelper";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
    const navigate = useNavigate()
    const {user} = useAuth()
    const [newData, setNewData] = React.useState({})
    const [validationErrors, setValidationErrors] = React.useState({})


    React.useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    const handleSubmit = async () => {

        try {
            const response = await axios.post(api_helper.api_url + api_helper.auth.register, newData);

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
            setValidationErrors(error.response.data.errors)
        }
    };

    return (
        <div className="" style={{
            backgroundColor: "#D9AFD9",
            backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
            height: "100svh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Helmet>
                <title>Horhoria Flowers - Kayıt Ol</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda kayıt olun. Hesap oluşturarak indirimlerden yararlanın, hızlı alışveriş deneyimi yaşayın ve geniş ürün yelpazemizle ihtiyacınız olan her şeyi keşfedin!"
                />
            </Helmet>

            <div style={{
                padding: "20px",
                borderRadius: "10px",
                width: "auto",
                minWidth: "40%",
                margin: "auto",
                boxShadow: "0px 0px 10px 0px #D0C9C9",
                backgroundColor: "#f6f5f6",
                overflowY: "auto"
            }}>
                <RegisterForm
                    newData={newData}
                    setNewData={setNewData}
                    validationErrors={validationErrors}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}