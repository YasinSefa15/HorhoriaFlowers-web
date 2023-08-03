import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import {
    createProfileAddresses,
    getProfileAddresses,
    getProfileOrders
} from "../../../../api.requests/profile/ProfileRequests";

export default function ProfileOrders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {secret} = useAuth();

    React.useEffect(() => {
        const fetchOrders = async () => {
            await getProfileOrders({setOrders, setLoaded, secret})
        }

        fetchOrders().then(() => {
        })
    }, [])



    return (
        <>
            <div className="d-flex justify-content-center">
                <h3>Siparişlerim </h3>
                <div>
                    6
                </div>
            </div>


            <div
                className="order-track"
            >
                <div
                    className="order-track-header"
                >
                    <div className="row">
                        <div
                            className="col">
                            <div className="order-track-title">
                                Sipariş No
                            </div>
                            <div className="order-track-detail">
                                asadadasd
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Sipariş Tarihi
                            </div>
                            <div className="order-track-detail">
                                12 Haz 2020
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Total
                            </div>
                            <div className="order-track-detail">
                                120₺
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Ürün Adeti
                            </div>
                            <div className="order-track-detail">
                                4
                            </div>
                        </div>
                    </div>

                </div>

                <div
                    className="order-track-items"
                >
                    <div
                        className="order-track-item"
                    >
                        <div
                            className="row"
                        >
                            <div className="col col-sm-2" >
                                <img
                                    src="http://127.0.0.1:8000/storage/attached_files/products/64aee48cc2643.jpg"
                                    className="img-fluid"
                                    alt="x"
                                ></img>
                            </div>
                            <div className="col col-sm-8 d-flex justify-content-start">
                                Güzel eldiven iyi eldiven
                            </div>

                        </div>
                    </div>

                    <div
                        className="order-track-item"
                    >
                        <div
                            className="row"
                        >
                            <div className="col col-sm-2" >
                                <img
                                    src="http://127.0.0.1:8000/storage/attached_files/products/64aee48cc2643.jpg"
                                    className="img-fluid"
                                    alt="x"
                                ></img>
                            </div>
                            <div className="col col-sm-8 d-flex justify-content-start">
                                Güzel eldiven iyi eldiven
                            </div>

                        </div>
                    </div>
                </div>






            </div>

            <div
                className="order-track"
            >
                <div
                    className="order-track-header"
                >
                    <div className="row">
                        <div
                            className="col">
                            <div className="order-track-title">
                                Sipariş No
                            </div>
                            <div className="order-track-detail">
                                asadadasd
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Sipariş Tarihi
                            </div>
                            <div className="order-track-detail">
                                12 Haz 2020
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Total
                            </div>
                            <div className="order-track-detail">
                                120₺
                            </div>
                        </div>

                        <div
                            className="col">
                            <div className="order-track-title">
                                Ürün Adeti
                            </div>
                            <div className="order-track-detail">
                                4
                            </div>
                        </div>
                    </div>

                </div>

                <div
                    className="order-track-items"
                >
                    <div
                        className="order-track-item"
                    >
                        <div
                            className="row"
                        >
                            <div className="col col-sm-2" >
                                <img
                                    src="http://127.0.0.1:8000/storage/attached_files/products/64aee48cc2643.jpg"
                                    className="img-fluid"
                                    alt="x"
                                ></img>
                            </div>
                            <div className="col col-sm-8 d-flex justify-content-start">
                                Güzel eldiven iyi eldiven
                            </div>

                        </div>
                    </div>

                    <div
                        className="order-track-item"
                    >
                        <div
                            className="row"
                        >
                            <div className="col col-sm-2" >
                                <img
                                    src="http://127.0.0.1:8000/storage/attached_files/products/64aee48cc2643.jpg"
                                    className="img-fluid"
                                    alt="x"
                                ></img>
                            </div>
                            <div className="col col-sm-8 d-flex justify-content-start">
                                Güzel eldiven iyi eldiven
                            </div>

                        </div>
                    </div>
                </div>






            </div>
        </>
    )
}