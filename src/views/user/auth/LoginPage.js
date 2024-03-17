import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import React from "react";
import {Helmet} from "react-helmet";
import {api_helper} from "../../../utils/api_helper";
import HTTPNotificationHelper from "../../../utils/HTTPNotificationHelper";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
    const {user, secret, handleLogin} = useAuth()
    const [validationErrors, setValidationErrors] = React.useState({})
    const [newData, setNewData] = React.useState({})
    const navigate = useNavigate()


    React.useEffect(() => {
        if (user !== false && secret !== null) {
            navigate("/")
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(api_helper.api_url + api_helper.auth.login, newData);
            if (response.status === 200) {
                await handleLogin(response.data)

                //setSecret(response.data.token)
                navigate("/")

                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message
                })
                setValidationErrors({})
            }
        } catch (error) {
            if (error.response.status === 422) {
                setValidationErrors(error.response.data.errors)

                HTTPNotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.data.message
                })
            } else {
                HTTPNotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.data.message
                })
            }
        }
    };

    return (
        <div style={{
            backgroundColor: "#D9AFD9",
            backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
            height: "100svh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Helmet>
                <title>Horhoria Flowers - Giriş Yap</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformuna giriş yapın. Hesabınıza erişim sağlayın, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!"
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
                <LoginForm
                    validationErrors={validationErrors}
                    handleSubmit={handleSubmit}
                    newData={newData}
                    setNewData={setNewData}
                />

            </div>
        </div>
    )
}