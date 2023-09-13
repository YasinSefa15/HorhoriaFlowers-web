import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import {api_helper} from "../../../../helpers/api_helper";
import 'react-notifications-component/dist/theme.css'
import HTTPNotificationHelper from "../../../../helpers/HTTPNotificationHelper";
import CustomButton from "../../../user/components/CustomButton";
import {Button} from "react-bootstrap";


export default function ProductCreate() {
    const navigate = useNavigate()
    return (

        <>
            <div className="container" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>

                <div className="d-flex align-items-center">
                    <Button
                        variant="light" // Butonun arka plan rengini gri yapıyoruz
                        className="arrow-button"
                        onClick={() => {
                            console.log("hehe")
                            navigate("/admin/products")
                        }}
                    >
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </Button>

                    <div><b>Geri Dön</b></div>
                </div>

            </div>

        </>
    )
}