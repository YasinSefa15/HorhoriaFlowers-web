import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import {
    getProfileOrders
} from "../../../../api.requests/profile/ProfileRequests";
import {Helmet} from "react-helmet";
import LoadingScreen from "../LoadingScreen";

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
            <Helmet>
                <title>Hooria E-Ticaret - Siparişlerim</title>
                <meta name="description"
                      content="Hooria e-ticaret platformunda verdiğiniz siparişleri görüntüleyin, takip edin ve geçmiş siparişlerinizi kontrol edin. Sipariş durumlarınızı ve ayrıntılarınızı inceleyin."/>
            </Helmet>

            <div className="d-flex justify-content-center">
                <h3>Siparişlerim </h3>
            </div>

            {!loaded ? (<LoadingScreen></LoadingScreen>) :
                orders.map((order, index) => {
                    return (
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
                                            Takip Numarası
                                        </div>
                                        <div className="order-track-detail">
                                            {order.order_code}
                                        </div>
                                    </div>

                                    <div
                                        className="col">
                                        <div className="order-track-title">
                                            Sipariş Tarihi
                                        </div>
                                        <div className="order-track-detail">
                                            {order.created_at}
                                        </div>
                                    </div>

                                    <div
                                        className="col">
                                        <div className="order-track-title">
                                            Total
                                        </div>
                                        <div className="order-track-detail">
                                            {order.price}₺
                                        </div>
                                    </div>

                                    <div
                                        className="col">
                                        <div className="order-track-title">
                                            Ürün Adeti
                                        </div>
                                        <div className="order-track-detail">
                                            {order.ordered_items_count}
                                        </div>
                                    </div>

                                    <div
                                        className="col">
                                        <div className="order-track-title">
                                            Sipariş Durumu
                                        </div>
                                        <div className="order-track-detail">
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div
                                className="order-track-items"
                            >
                                {order.ordered_products.map((item, index) => {
                                    return (
                                        <div
                                            className="order-track-item"
                                        >
                                            <div
                                                className="row"
                                            >
                                                <div className="col col-sm-2">
                                                    <img
                                                        src={item.image}
                                                        className="img-fluid"
                                                        alt={item.title}
                                                        style={{
                                                            width: "55px",
                                                            height: "84px",
                                                            objectFit: "cover"
                                                        }}
                                                    ></img>
                                                </div>
                                                <div className="col col-sm-8 d-flex justify-content-start">
                                                    {item.title}
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
        </>
    )
}