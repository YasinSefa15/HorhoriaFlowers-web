import React from 'react';
import "../../styles/pages/Cart.css"
import ItemCount from "../../components/cart/ItemCount";
import {
    deleteLoggedInUserProduct,
    readLoggedInUserCart,
    updateLoggedInUserCart
} from "../../api.requests/cart/CartRequests";
import TopNavigationBar from "../../components/Home/TopNavigationBar";
import {useAuth} from "../../context/AuthContext";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [updated, setUpdated] = React.useState(false)
    const [subTotal, setSubTotal] = React.useState(parseInt(0))
    const [total, setTotal] = React.useState(parseInt(0))
    const {secret} = useAuth()


    React.useEffect(() => {
        readLoggedInUserCart({setProducts, secret})
    }, [])

    React.useEffect(() => {
        let total = 0;
        products.map((product, index) => {
            total += product.new_price * product.quantity
        })
        setSubTotal(total)
        setTotal(total + 20 + 20)
    }, [subTotal, products])

    const updateTotal = (price, quantity) => {
        setSubTotal(subTotal + (price * quantity))
        setTotal(subTotal + 20 + 20) //todo vergi + kargo
    }

    const updateProductQuantity = (product_id, quantity) => {
        if (quantity < 1) {
            return
        }
        products.map((product, index) => {
            if (product.product_id === product_id) {
                updateLoggedInUserCart({product_id: product_id, quantity: quantity, secret})
                setUpdated(!updated)
                return product.quantity = quantity;
            }
            return product
        })
    }

    const deleteProduct = (product_id) => {
        setProducts(products.filter((product, index) => {
            if (product.product_id === product_id) {
                console.log("asdasd")
                deleteLoggedInUserProduct({product_id: product_id, secret})
                //setUpdated(!updated)
                return false;
            }
            return true
        }))
    }

    return (
        <>
            <TopNavigationBar/>

            <div className="small-container cart-page">
                <table>
                    <tr>
                        <th>Ürün Detayı</th>
                        <th>Miktar</th>
                        <th>Ara Tutar</th>
                    </tr>
                    {products.map((product, index) => (
                        <>
                            <tr>
                                <td>
                                    <div className="cart-info">
                                        <img
                                            src={product.image.file_path}
                                        ></img>
                                        <div>
                                            <p>{product.title}</p>
                                            <small>Fiyat: {product.new_price}₺</small>
                                            <br/>
                                            <a href={"#"}
                                               onClick={(e) => deleteProduct(product.product_id)}
                                            >
                                                Sepetten Çıkar
                                            </a>
                                        </div>
                                    </div>

                                </td>
                                <td>
                                    <ItemCount
                                        count={product.quantity}
                                        id={product.product_id}
                                        price={product.new_price}
                                        updateProductQuantity={updateProductQuantity}
                                        updateTotal={updateTotal}
                                    ></ItemCount>
                                </td>
                                <td>{product.quantity * product.new_price} ₺</td>
                            </tr>
                        </>
                    ))}

                </table>

                <div className={"total-price"}>

                    {((() => {
                        if (products.length === 0) {
                            return <h2>Cart is empty</h2>
                        }
                        return <>

                                <table>
                                    <th>
                                        <td>Kupon</td>
                                    </th>
                                    <tr>
                                        <td>
                                            <div className="payment-coupon">
                                                <label>Kupon Giriniz:</label>
                                                <input type="text"></input>
                                                <button>Ekle</button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                            <div>

                            </div>

                                <table>
                                    <th>
                                        Toplam
                                    </th>
                                    <th>

                                    </th>
                                    <tr>
                                        <td>Ara Toplam</td>
                                        <td>{subTotal}₺</td>
                                    </tr>
                                    <tr>
                                        <td>Vergi</td>
                                        <td>20₺</td>
                                    </tr>
                                    <tr>
                                        <td>Kargo Ücreti</td>
                                        <td>20₺</td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{total}₺</td>
                                    </tr>
                                </table>

                        </>
                    }))()}


                </div>

            </div>

        </>
    )

}