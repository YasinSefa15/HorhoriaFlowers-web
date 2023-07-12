import "../../components/product_cart/ProductCart.css"
import React from 'react';

export default function ProductCart({product, handleDivClick, addToCart}) {
    return (
        <>
            <div
                className="product-cart-box col-12  col-sm-6 col-md-6 col-lg-4 col-xl-3 .col-xxl-3"
                onClick={() => handleDivClick(product)}
                style={{
                    marginBottom: "10px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
            >
                <img
                    src={product.images[0].file_path}
                    alt="product name"
                    className="w-100 h-auto mb-2"
                />

                <h2
                    className="text-uppercase mb-2"
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: 600
                    }}
                >
                    {product.title}
                </h2>

                <span
                    style={{
                        fontWeight: 600,
                    }}
                >
                    {product.new_price}
                </span>

                <i
                    className="fa-solid fa-cart-plus"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem 0 0 0",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                    }}
                    onClick={(event) => addToCart(event, product.id, product.title)}
                ></i>
            </div>
        </>
    )
}

//todo image indicator