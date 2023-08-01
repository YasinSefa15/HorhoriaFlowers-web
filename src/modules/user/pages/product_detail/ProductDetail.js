import React, {useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
//import ProductDetail css
import "../../configs/ProductDetail.css";
import {useState} from "react";
import CustomButton from "../../components/CustomButton";
import addCartInDetail from "../../../../api.requests/cart/CartRequests";
import {useAuth} from "../../../../context/AuthContext";

export default function ProductDetail() {
    //todo ürün sepette mi? sepetteyse miktarını getir
    const location = useLocation()
    const product = location.state.product
    const [mainImage, setMainImage] = useState(product.images[0].file_path)
    const [quantity, setQuantity] = useState(1)
    const {secret, cartProducts, setCartProducts} = useAuth();
    const navigate = useNavigate();
    //console.log(location.state)

    useEffect(() => {
        const products = JSON.parse(JSON.stringify(cartProducts));

        for (let i = 0; i < products.length; i++) {
            if (products[i].slug === product.slug) {
                setQuantity(products[i].quantity)
            }
        }
        //console.log(products.find((product) => product.product_id === product.id))

    }, [])

    const changeImage = (id) => {
        setMainImage(product.images[id].file_path)
    }


    return (
        <>
            {console.log(product.categories)}
            <div className="container mt-5">
                <div>
                    {((() => {
                        const titles = product.categories.titles.split("/")
                        console.log("titles ", titles)
                        const slugs = product.categories.slugs.split("/")
                        return (
                            <>
                                <div className={"d-flex"}>
                                    {titles.map((title, index) => {
                                        return (
                                            <>
                                                <h5
                                                    className="text-decoration-none mb-4 cursor-pointer"
                                                    style={index !== 0 ? {
                                                        marginLeft: "0.5rem",
                                                        marginRight: "0.5rem",
                                                    } : {
                                                        marginRight: "0.5rem",
                                                    }}
                                                    onClick={() => {
                                                        navigate(`/categories/${slugs[index]}?page=1`)
                                                    }}
                                                >{title}</h5>
                                                {index !== titles.length - 1 && <span> / </span>}
                                            </>
                                        );
                                    })}
                                </div>

                            </>
                        );
                    }))()}
                </div>


                <div className="row justify-content-center">

                    <div className="offset-lg-2 col-lg-4 col-md-8 col-12">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="img-fluid pb-1 w-100"
                            style={{}}
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

                        </div>
                    </div>

                    <div className="col-lg-6 col-md-4 col-12">
                        <div className="product-detail-title text-center">
                            <h1 className="py-4">{product.title}</h1>
                        </div>

                        <div
                            className="product-detail-price d-flex flex-column text-center align-items-center"
                            style={{
                                marginTop: "-10px"
                            }}
                        >
                            <hr className="w-25"></hr>

                            <h2 className="fw-bold">{product.new_price}₺</h2>

                            <div className="p-detail-rating">
                                <i
                                    className="fa-solid fa-star"
                                    style={{
                                        color: "#FFD700"
                                    }}
                                ></i>
                                <i
                                    className="fa-solid fa-star"
                                    style={{
                                        color: "#FFD700"
                                    }}
                                ></i>
                                <i
                                    className="fa-solid fa-star"
                                    style={{
                                        color: "#FFD700"
                                    }}
                                ></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>

                        </div>


                        <div className="d-flex justify-content-center">
                            <select className="my-3">
                                <option>Beden Seçiniz</option>
                                <option>XXL</option>
                                <option>XL</option>
                                <option>Large</option>
                                <option>Medium</option>
                                <option>Small</option>
                            </select>
                        </div>


                        <div className="product-detail-action row justify-content-center ">
                            <hr className="w-75 mt-2"></hr>

                            <div className="row justify-content-center mt-2">

                                <div className="product-detail-quantity col-md-4 d-flex align-items-center"
                                     style={{
                                         width: "max-content",
                                     }}>
                                    <div
                                        style={{
                                            width: "30px",
                                            height: "50px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTop: "1px solid #000",
                                            borderBottom: "1px solid #000",
                                            borderLeft: "1px solid #000",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            if (quantity > 1) {
                                                setQuantity(quantity - 1)
                                            }
                                        }}
                                    >
                                        -
                                    </div>


                                    <div
                                        style={{
                                            width: "30px",
                                            height: "50px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTop: "1px solid #000",
                                            borderBottom: "1px solid #000",
                                        }}
                                    >
                                        {quantity}
                                    </div>

                                    <div
                                        style={{
                                            width: "30px",
                                            height: "50px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTop: "1px solid #000",
                                            borderBottom: "1px solid #000",
                                            borderRight: "1px solid #000",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            setQuantity(quantity + 1)
                                        }}
                                    >
                                        +
                                    </div>
                                </div>

                                <div
                                    className={"col-md-5"}
                                >
                                    <CustomButton
                                        text={"Sepete Ekle"}
                                        style={{
                                            width: "100%",
                                            height: "50px",
                                        }}
                                        onClick={() => {
                                            addCartInDetail(product.title, product.id, quantity, secret)
                                        }}
                                    ></CustomButton>
                                </div>
                            </div>


                        </div>

                        <br></br>

                        <div
                            className="d-flex justify-content-center">

                            <hr className="w-75"></hr>
                        </div>


                        <h4 className="mt-5 mb-5 text-uppercase">Ürün Detayları</h4>

                        <div
                            style={{
                                backgroundColor: "#efe7e7",
                                padding: "20px",
                            }}
                        >{product.description}</div>
                    </div>
                </div>
            </div>

        </>
    )
}