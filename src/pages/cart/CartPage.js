import React from 'react';
import "../../styles/pages/Products.css"
import CartProduct from "./CartProduct";
import "../../styles/pages/Cart.css"
import 'reactjs-popup/dist/index.css';
import ItemCount from "../../components/cart/ItemCount";
import {readLoggedInUserCart, updateLoggedInUserCart} from "../../api.requests/cart/CartRequests";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const [updated, setUpdated] = React.useState(false)

    React.useEffect(() => {
        readLoggedInUserCart({setProducts})
    }, [])


    const updateProductQuantity = (id, quantity) => {
        products.map((product, index) => {
            if (product.id === id) {
                updateLoggedInUserCart({input: {id: id, quantity: quantity}})
                setUpdated(!updated)
                return product.quantity = quantity;
            }
            return product
        })
    }


    return (

        <>
            <div className="cart-container">

                {(() => (
                    products.map((product, index) => {
                        console.log(product.file_path)
                        return (
                            <div className="row">
                                <CartProduct
                                    product={product}
                                    key={index}
                                />


                                <ItemCount
                                    count={product.quantity}
                                    id={product.id}
                                    updateProductQuantity={updateProductQuantity}
                                ></ItemCount>
                            </div>
                        )
                    })
                ))()}
            </div>

        </>
    )

}