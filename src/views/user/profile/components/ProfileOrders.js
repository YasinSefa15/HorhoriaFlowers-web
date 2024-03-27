import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import {
    getProfileOrders
} from "../../../../requests/profile/ProfileRequests";
import {Helmet} from "react-helmet";
import LoadingScreen from "../../../../components/LoadingScreen";
import uuidGenerator from "../../../../utils/uuidGenerator";
import CustomPagination from "../../../../components/user/pagination/CustomPagination";

export default function ProfileOrders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {secret} = useAuth();
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageCount: 1
    });

    React.useEffect(() => {
        fetchOrders({
            page: 1
        }).then(() => {
        })
    }, [])

    const fetchOrders = async ({page}) => {
        await getProfileOrders({
            setOrders, setLoaded,
            secret, page,
            setPagination
        })
    }

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Siparişlerim</title>
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
                            key={uuidGenerator()}
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
                                            key={uuidGenerator()}
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

            <CustomPagination
                pageCount={pagination.pageCount}
                currentPage={pagination.currentPage}
                changeCurrentPage={async (changeInPage) => {
                    const parsedPage = parseInt(pagination.currentPage)

                    if (changeInPage > 0) {
                        if (parsedPage + changeInPage <= pagination.pageCount) {
                            await fetchOrders({page: parsedPage + changeInPage})
                        }

                    } else if (changeInPage < 0) {
                        if (parsedPage + changeInPage > 0) {
                            await fetchOrders({page: parsedPage + changeInPage})
                        }
                    }


                }}
            />
        </>
    )
}