import React from 'react';

export default function ProductCart({product, handleDivClick, addToCart}) {
    return (
        <>
            <div
                className={"product-cart-box col-12  col-sm-6 col-md-6 col-lg-4 col-xl-3 .col-xxl-3 "
                    + (+product.quantity === 0 ? "product-cart-disabled" : "") + " mb-4"}
                onClick={() => handleDivClick(product)}
                style={{
                    marginBottom: "10px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
            >

                <div className="position-relative">
                    <img
                        src={product.images[0].file_path}
                        alt="product name"
                        className="w-100 h-auto mb-2"
                    />
                    <div
                        className={"overlay" + (+product.quantity === 0 ? " product-cart-disabled" : " visually-hidden")}
                    >
                        Tükendi
                    </div>
                </div>


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
                    {((() => {
                        if (product.new_price !== product.old_price) {
                            return (
                                <span style={{
                                    textDecoration: "line-through",
                                }}>
                                    {product.old_price + "₺    "}
                                </span>
                            )
                        }
                    }))()}
                    {product.new_price}₺ {"    "}
                    {((() => {
                        if (product.new_price !== product.old_price) {
                            return (
                                <div style={{
                                    width: "max-content",
                                    padding: "0.2rem 0.5rem",
                                    display: "inline-block",
                                    backgroundColor: "#f44336",
                                    borderRadius: "0.5rem",
                                    color: "white",
                                }}>
                                    <i className="fa-solid fa-tag" style={{color: "#ffffff"}}></i>
                                    {"    " + (Math.round((product.old_price - product.new_price) / product.old_price * 100)) + "%"}
                                </div>
                            )
                        }
                    }))()}
                </span>

                <i
                    className={"cart-icon fa-solid fa-cart-plus" + (+product.quantity === 0 ? " visually-hidden" : "")}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem 0 0 0",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        fontSize: "1.3rem",
                    }}
                    onClick={(event) => addToCart(event, product.id, product.title)}
                ></i>
            </div>
        </>
    )
}

//todo image indicator