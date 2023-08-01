import React from 'react';
import "../../configs/Cart.css"
import ItemCount from "../../components/cart/ItemCount";
import {
    deleteLoggedInUserProduct,
    readLoggedInUserCart,
    updateLoggedInUserCart
} from "../../../../api.requests/cart/CartRequests";
import TopNavigationBar from "../../components/Home/TopNavigationBar";
import {useAuth} from "../../../../context/AuthContext";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [subTotal, setSubTotal] = React.useState(parseInt(0))
    const [total, setTotal] = React.useState(parseInt(0))
    const {secret, setCartProducts} = useAuth();


    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const loadCartProducts = async () => {
            await readLoggedInUserCart({setProducts: setProducts, secret: secret});
            console.log("cart products loaded");
            setCartProducts(products)
        };
        const localCartProducts = localStorage.getItem("cartProducts");
        if (localCartProducts) {
            try {
                // Parse the JSON data from local storage
                const parsedCartProducts = JSON.parse(localCartProducts);
                if (Array.isArray(parsedCartProducts)) {
                    setProducts(parsedCartProducts);

                } else {
                    loadCartProducts().then(r => {
                        setCartProducts(products)
                    });
                }
                console.log("cart products loaded yyy");
            } catch (error) {
                console.error("Error parsing cartProducts from local storage:", error);
                loadCartProducts().then(r => {
                    setCartProducts(products)
                });
            }
        } else {
            // If not available in local storage, fetch from server

            loadCartProducts().then(r => {
                //setCartProducts(products)
            });
        }
    }, [])

    React.useEffect(() => {
        let total = 0;
        console.log("products", products)

        products.map((product, index) => {
            total += product.new_price * product.quantity
        })
        setSubTotal(total)
        setTotal(total + 20 + 20)

    }, [products])


    const updateTotal = (price, quantity) => {
        setSubTotal(subTotal + (price * quantity))
        setTotal(subTotal + 20 + 20) //todo vergi + kargo
    }

    const updateProductQuantity = (product_id, quantity) => {
        if (quantity < 1) {
            return
        }

        const a = products.map((product, index) => {
            if (product.product_id === product_id) {
                updateLoggedInUserCart({product_id: product_id, quantity: quantity, secret});
                return {...product, quantity: quantity}
            }
            return product;
        });

        setProducts(a)
        setCartProducts(a)

        // Update the cartProducts in the context with the new quantity

    }

    const deleteProduct = (product_id) => {
        setProducts(products.filter((product, index) => {
            if (product.product_id === product_id) {
                deleteLoggedInUserProduct({product_id: product_id, secret})
                //localden
                setCartProducts(products.filter((product, index) => product.product_id !== product_id))
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
                    {products.map((product) => (
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