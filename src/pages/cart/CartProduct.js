import {api_helper} from "../../helpers/api_helper";
import ImageComponent from "../../components/ImageComponent";
import React from "react";

export default function CartProduct({product}) {
    //console.log("product", product.file_path)
    return (
        <div className="cart-product">
            <div className="cart-product__image">
                <ImageComponent
                    className="cart-product__image"
                    images={[{
                    file_path: product.file_path,
                    order_of: 1
                }]}
                                visibleOrder={1}
                />
            </div>
            <div className="cart-product__info">
                <div className="cart-product__name">
                    {product.name}

                </div>
                <div className="cart-product__price">
                    {product.price}
                </div>
                <div className="cart-product__quantity">
                    <input type="number" min="1" max="100" value={product.quantity} onChange={(e) => {
                        product.quantity = e.target.value
                    }}/>
                </div>
                <div className="cart-product__total">
                    {product.price * product.quantity}
                </div>
                <div className="cart-product__delete">
                    <button onClick={() => {

                    }}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>

    )
}