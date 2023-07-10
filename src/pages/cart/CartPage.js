import React from 'react';
import "../../styles/pages/Products.css"
import CartProduct from "./CartProduct";
import "../../styles/pages/Cart.css"
import 'reactjs-popup/dist/index.css';
import ItemCount from "../../components/cart/ItemCount";
import {
    deleteLoggedInUserProduct,
    readLoggedInUserCart,
    updateLoggedInUserCart
} from "../../api.requests/cart/CartRequests";
import TopNavigationBar from "../../components/Home/TopNavigationBar";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [updated, setUpdated] = React.useState(false)

    React.useEffect(() => {
        readLoggedInUserCart({setProducts})
    }, [])


    const updateProductQuantity = (id, quantity) => {
        if (quantity < 1) {
            return
        }
        products.map((product, index) => {
            if (product.id === id) {
                updateLoggedInUserCart({input: {id: id, quantity: quantity}})
                setUpdated(!updated)
                return product.quantity = quantity;
            }
            return product
        })
    }

    const deleteProduct = (id) => {
        setProducts(products.filter( (product, index) => {
            if (product.id === id) {
                deleteLoggedInUserProduct({input: {product_id: id}})
                //setUpdated(!updated)
                return false;
            }
            return true
        }))
    }

    return (
        <>
            <TopNavigationBar/>


            <div className="container cart-container">

                {(() => (
                    products.map((product, index) => {
                        console.log(product.file_path)
                        return (
                            <div className="row cart-product">
                                <div className="col-4">
                                    <CartProduct
                                        product={product}
                                        key={index}
                                    />
                                </div>

                                <div className="col-2">
                                    <ItemCount
                                        count={product.quantity}
                                        id={product.id}
                                        updateProductQuantity={updateProductQuantity}
                                        deleteProduct={deleteProduct}
                                    ></ItemCount>
                                </div>
                            </div>
                        )
                    })
                ))()}
            </div>

        </>
    )

}