import React from 'react';
import {Helmet} from "react-helmet";
import {useAuth} from "../../../context/AuthContext";
import {getVisitorCartProducts} from "../../../requests/cart/VisitorRequests";
import {
    deleteLoggedInUserProduct,
    readLoggedInUserCart,
    updateLoggedInUserCart
} from "../../../requests/cart/CartRequests";
import TopNavigationBar from "../../../components/TopNavigationBar";
import CartProductsList from "./components/CartProductsList";
import CartCoupon from "./components/CartCoupon";
import CartPrice from "./components/CartPrice";

export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [subTotal, setSubTotal] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [discount, setDiscount] = React.useState(0)
    const [appliedCoupons, setAppliedCoupons] = React.useState([])
    const [visitorProLoad, setVisitorProLoad] = React.useState(false)
    const [cargoPrice, setCargoPrice] = React.useState(37.99)
    const {secret, setCartProducts} = useAuth();


    React.useEffect(() => {
        const loadCartProducts = async () => {
            const visitorCartProducts = localStorage.getItem("visitorCartProducts");
            if (visitorCartProducts) {
                await getVisitorCartProducts({
                    setProducts: setProducts,
                    cartProducts: visitorCartProducts,
                    products: products
                })
                await setVisitorProLoad(true)

                return
            }
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
        const visitorCartProducts = localStorage.getItem("visitorCartProducts");
        if (visitorProLoad) {
            const JSONVisitorCartProducts = JSON.parse(visitorCartProducts);
            const updatedProducts = products.map(product => {
                const cartProduct = JSONVisitorCartProducts.find(cartItem => {
                    return (
                        (cartItem.id || cartItem.product_id) === (product.id || product.product_id)
                        && cartItem.size_id === product.size_id)
                });
                // Eşleşen ürünü bul, yoksa null döner

                if (cartProduct) {
                    return {
                        ...product,
                        quantity: cartProduct.quantity // quantity değerini ekliyoruz
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
        }
    }, [visitorProLoad])

    React.useEffect(() => {
        let calculatedSubTotal = 0;

        products.map((product, index) => {
            calculatedSubTotal += product.new_price * product.quantity
            return product
        })
        setSubTotal(calculatedSubTotal)
        let localCargo = 0
        if (calculatedSubTotal > 300) {
            setCargoPrice(0)
        } else {
            localCargo = 37.99
            setCargoPrice(37.99)
        }
        setTotal(calculatedSubTotal + localCargo - discount)

    }, [products, discount])


    const updateTotal = (price, quantity) => {
        setSubTotal(subTotal + (price * quantity))
        if (subTotal > 300) {
            setCargoPrice(0)
        } else {
            setCargoPrice(37.99)
        }
        setTotal(subTotal + cargoPrice)
    }

    const updateProductQuantity = (product_id, quantity, size_id) => {
        if (quantity < 1) {
            return
        }

        const a = products.map((product, index) => {
            if (product.product_id === product_id && product.size_id === size_id) {
                if (secret === null) {
                    return {...product, quantity: quantity}
                }
                updateLoggedInUserCart({product_id: product_id, quantity: quantity, secret, size_id});
                return {...product, quantity: quantity}
            }
            return product;
        });

        setProducts(a)
        if (secret === null) {
            localStorage.setItem("visitorCartProducts", JSON.stringify(a));
            return
        }
        // Update the cartProducts in the context with the new quantity
        setCartProducts(a)
    }

    const deleteProduct = (product_id, size_id) => {
        setProducts(products.filter((product, index) => {
            if ((product.product_id || product.id) === product_id && product.size_id === size_id) {
                if (secret === null) {
                    const a = products.filter((product, index) => {
                        if ((product.id === product_id && product.size_id === size_id)) {
                            return false
                        }
                        return true
                    })
                    localStorage.setItem("visitorCartProducts", JSON.stringify(a));
                    return false;
                }
                deleteLoggedInUserProduct({product_id: product_id, secret, size_id}).then(r => {
                })
                //localden
                setCartProducts(products.filter((product, index) => {
                    //return !(((product.id || product.product_id) === product_id) && product.size_id === size_id);
                    return true
                }))
                //setUpdated(!updated)
                return false;
            }
            return true
        }))
    }

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Sepetim</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda sepetinizi görüntüleyin, ürünleri düzenleyin ve alışverişinizi tamamlayın. İhtiyacınız olan ürünleri sepetinizde bulabilir ve hızlı alışveriş deneyimi yaşayabilirsiniz."
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

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
                            return <div className="alert alert-warning" role="alert">
                                Sepetinizde herhangi bir ürün bulunmamaktadır.
                            </div>
                        }
                        return <>
                            <div className="container">
                            <div className="row d-flex justify-content-around">
                                    <div className="col col-sm-4">
                                        <CartCoupon
                                            appliedCoupons={appliedCoupons}
                                            setAppliedCoupons={setAppliedCoupons}
                                            total={total}
                                            setTotal={setTotal}
                                            discount={discount}
                                            setDiscount={setDiscount}
                                        ></CartCoupon>
                                    </div>

                                    <div className="col col-12 col-sm-6 mt-5 mt-sm-0">
                                        <CartPrice
                                            total={total}
                                            subTotal={subTotal}
                                            discount={discount}
                                            setDiscount={setDiscount}
                                            cargoPrice={cargoPrice}
                                            appliedCoupons={appliedCoupons}
                                        ></CartPrice>
                                    </div>
                                </div>
                            </div>
                        </>
                    }))()}
                </div>
            </div>
        </>
    )

}