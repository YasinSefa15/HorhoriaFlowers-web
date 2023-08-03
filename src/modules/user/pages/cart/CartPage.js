import React from 'react';
import {
    deleteLoggedInUserProduct,
    readLoggedInUserCart,
    updateLoggedInUserCart
} from "../../../../api.requests/cart/CartRequests";
import TopNavigationBar from "../../components/Home/TopNavigationBar";
import {useAuth} from "../../../../context/AuthContext";
import CartCoupon from "../../components/cart/CartCoupon";
import CartPrice from "../../components/cart/CartPrice";
import CartProductsList from "../../components/cart/CartProductsList";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [subTotal, setSubTotal] = React.useState(parseInt(0))
    const [total, setTotal] = React.useState(parseInt(0))
    const {secret, setCartProducts} = useAuth();



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

            <div className="container mt-4 mb-5">
                <CartProductsList
                    products={products}
                    updateTotal={updateTotal}
                    updateProductQuantity={updateProductQuantity}
                    deleteProduct={deleteProduct}
                ></CartProductsList>

                <div className={"total-price"}>
                    {((() => {
                        if (products.length === 0) {
                            return <h2>Cart is empty</h2>
                        }
                        return <>
                            <div className="container">
                                <div className="row">
                                    <CartCoupon></CartCoupon>
                                    <div className="col col-0 col-sm-2"></div>
                                    <CartPrice
                                        total={total}
                                        subTotal={subTotal}
                                    ></CartPrice>
                                </div>
                            </div>
                        </>
                    }))()}
                </div>
            </div>
        </>
    )

}