import React from 'react';
import {getOrderSelectedAddressDetail} from "../../../../../api.requests/OrderRequests";
import OrderProductsLists from "./OrdeProductsList";
import {useAuth} from "../../../../../context/AuthContext";

export default function OrderStep2({selectedAddressId, secret, total}) {
    const [address, setAddress] = React.useState(null)
    const {cartProducts} = useAuth()
    const [productsTotal, setProductsTotal] = React.useState(0)


    React.useEffect(() => {
        const fetchAddresses = async () => {
            await getOrderSelectedAddressDetail({selectedAddressId, setAddress, secret})
        }

        fetchAddresses().then(() => {
            //console.log("addresses", addresses)
        })
    }, [])
    return (
        <>
            <h2>Sipari Onayı</h2>

            <div className="row">
                <div className="col">
                    <hr></hr>
                    <div className="order-check-title">
                        <h3>Adres Bilgileri</h3>
                    </div>
                    <div className="order-check-body">
                        <p>
                            <b>Adress Başlığı:</b> {address?.title}
                        </p>
                        <p>
                            <b>Alıcı Bilgileri:</b> {address?.user_info}
                        </p>
                        <p>
                            <b>Adress Bilgileri:</b> {address?.full_address}
                        </p>
                    </div>
                    <hr></hr>
                </div>
            </div>

            <div className="row">
                <h3>Ürünler</h3>
                <OrderProductsLists
                    products={cartProducts}
                    setProductsTotal={setProductsTotal}
                ></OrderProductsLists>
            </div>


            <div className="row">
                <h3>Tutar: {total} ₺</h3>
            </div>
        </>
    )
}