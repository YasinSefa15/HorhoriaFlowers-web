import ItemCount from "./ItemCount";
import React from "react";
import {colorSchema} from "../../../../helpers/ColorSchema";
import {useNavigate} from "react-router-dom";

export default function CartProductsList({products, deleteProduct, updateProductQuantity, updateTotal}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="row">
                <div className="col p-2" style={{
                    backgroundColor: colorSchema.cart.primary,
                    color: colorSchema.cart.primaryText,
                    fontSize: colorSchema.cart.primaryFontSize,
                    fontWeight: colorSchema.cart.primaryFontWeight
                }}>Ürün Detayı
                </div>
                <div className="col p-2 col-sm-3" style={{
                    backgroundColor: colorSchema.cart.primary,
                    color: colorSchema.cart.primaryText,
                    fontSize: colorSchema.cart.primaryFontSize,
                    fontWeight: colorSchema.cart.primaryFontWeight
                }}>Miktar
                </div>
                <div className="col p-2 col-sm-2" style={{
                    backgroundColor: colorSchema.cart.primary,
                    color: colorSchema.cart.primaryText,
                    fontSize: colorSchema.cart.primaryFontSize,
                    fontWeight: colorSchema.cart.primaryFontWeight
                }}>Ara Tutar
                </div>
            </div>

            <div className="row mt-4">
                {products.map((product) => (
                    <div className="row mb-2" key={product.slug + product.size_id}>
                        <div className="col d-flex flex-wrap">
                            <img
                                src={product.image.file_path}
                                style={{
                                    width: "133px",
                                    height: "133px",
                                    objectFit: "cover",
                                    marginRight: "20px",
                                }}
                            ></img>
                            <div>
                                <p style={{fontSize: "20px", cursor: "pointer", marginBottom: "0px"}}
                                   onClick={() => navigate("/products/" + product.slug)}
                                >{product.title}</p>
                                <small>Fiyat: {product.new_price}₺</small>
                                {((() => {
                                    if (product.new_price !== product.old_price) {
                                        return (
                                            <>
                                                <br></br>
                                                <small>{"\t"}</small>
                                                <small style={{
                                                    textDecoration: "line-through",
                                                }}>{product.old_price + "₺"}</small>
                                                <span>{"\t\t\t"}</span>
                                                <div style={{
                                                    width: "max-content",
                                                    padding: "0.2rem 0.5rem",
                                                    display: "inline-block",
                                                    backgroundColor: "#f44336",
                                                    borderRadius: "0.5rem",
                                                    color: "white",
                                                    fontSize: "11px",
                                                }}>
                                                    <i className="fa-solid fa-tag " style={{color: "#ffffff"}}></i>
                                                    {"    " + (Math.round((product.old_price - product.new_price) / product.old_price * 100)) + "%"}
                                                </div>
                                            </>
                                        )
                                    }
                                }))()}
                                <br></br>
                                <small>Beden: {product.size_value}</small>
                                <br></br>
                                <a href={"#"}
                                   style={{
                                       color: colorSchema.warning_color,
                                       textDecoration: "none",
                                       fontSize: "14px",
                                   }}
                                   onClick={(e) => deleteProduct((product.product_id || product.id), product.size_id)}
                                >
                                    Sepetten Çıkar
                                </a>
                            </div>
                        </div>
                        <div className="col col-sm-3 d-flex align-items-center">
                            <ItemCount
                                count={product.quantity}
                                id={(product.product_id || product.id)}
                                price={product.new_price}
                                size_id={product.size_id}
                                updateProductQuantity={updateProductQuantity}
                                updateTotal={updateTotal}
                            ></ItemCount>
                        </div>

                        <div className="col col-sm-2 d-flex align-items-center" style={{fontSize: "20px"}}>
                            {product.quantity * product.new_price} ₺
                        </div>

                        <hr className="mt-4 opacity-25"></hr>
                    </div>
                ))}
            </div>
        </>
    )
}