import React from "react";
import {useLocation} from "react-router-dom";
//import ProductDetail css
import "../styles/pages/ProductDetail.css";
import {useState} from "react";

export default function ProductDetail() {
    const [mainImage, setMainImage] = useState(0)
    const location = useLocation()
    const product = location.state.product

    const changeImage = (id) => {
        setMainImage(product.images[id].file_path)
    }

    return (
        <>
            <section className="container sproduct my-5 pt-5">
                <div className="row">
                    <div className="col-lg-5 col-md-12 col-12">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="img-fluid w-100 pb-1"
                        />

                        <div className="small-img-group">
                            <div className="small-img-col">
                                <img
                                    src={product.images[0].file_path}
                                    alt={product.title}
                                    width="100%"
                                    onClick={() => {
                                        changeImage(0)
                                    }}
                                />
                            </div>

                            <div className="small-img-col">
                                <img
                                    src={product.images[1].file_path}
                                    alt={product.title}
                                    width="100%"
                                    onClick={() => {
                                        changeImage(1)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-12 col-12">
                        <h6>Home / T-shirt</h6>
                        <h3 className="py-4">{product.title}</h3>
                        <h2>{product.new_price}₺</h2>
                        <select className="my-3">
                            <option>Beden Seçiniz</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>Large</option>
                            <option>Medium</option>
                            <option>Small</option>
                        </select>
                        <input type="number" value="1"></input>
                        <button className="buy-btn">Sepete Ekle</button>
                        <h4 className="mt-5 mb-5">Ürün Detayları</h4>
                        <span>{product.description}</span>
                    </div>
                </div>
            </section>

        </>
    )
}