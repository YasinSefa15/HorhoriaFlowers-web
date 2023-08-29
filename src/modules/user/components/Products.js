import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ProductCart from "./product_cart/ProductCart";
import {
    addCartIfNotExists,
    createLoggedInUserProduct,
    readLoggedInUserCart
} from "../../../api.requests/cart/CartRequests";
import {useAuth} from "../../../context/AuthContext";
import CustomPagination from "./pagination/CustomPagination";
import './product_cart/ProductCart.css';
import LoadingScreen from "./LoadingScreen";
import {getCategoryProducts, getSearchedProducts} from "../../../api.requests/ProductRequests";
import {addVisitorProductToCart, addVisitorProductToCartIfNotExists} from "../../../api.requests/cart/VisitorRequests";

export default function Products({heading, setTitle, paramsProp, slug}) {
    const [totalPage, setTotalPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [requestedPage, setRequestedPage] = React.useState((new URLSearchParams(window.location.search)).get("page") || 1)
    const [products, setProducts] = React.useState([])
    const {secret, setCartProducts} = useAuth();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState(null);
    const [onStock, setOnStock] = useState(0);
    const [loading, setLoading] = useState(false);
    //const [heading, setHeading] = useState(null);

    const addToCart = (event, id, title) => {
        event.stopPropagation();

        if (!secret) {
            addVisitorProductToCartIfNotExists({title, id: id, quantity: 1});
            return;
        }

        const loadCartProducts = async () => {
            await addCartIfNotExists({
                id, secret, title,
            })
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
        };
        loadCartProducts().then(r => {
        });

    }
    const handleDivClick = (product) => {
        navigate("/products/" + product.slug, {state: {product: product}})
    };

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title") || ""

    let paramsDefault = {
        "limit": 10,
        "page": requestedPage,
        "title": title,
        "onStock": onStock ? 1 : 0,
        "orderBy": sortBy
    }
    let params = Object.assign({}, paramsDefault, paramsProp)

    React.useEffect(() => {
        if (params.category_slug === undefined) {
            const fetchProducts = async () => {
                await getSearchedProducts({
                    params: params,
                    setProducts: setProducts,
                    setTitle: setTitle,
                    setTotalPage: setTotalPage,
                    setCurrentPage: setCurrentPage,
                    requestedPage: requestedPage,
                    setLoading: setLoading
                })
            }
            fetchProducts().then(r => {
            })
        } else if (params.category_slug !== undefined) {
            console.log("params.category_slug   " + params.category_slug)
            console.log("params   ", params)
            const fetchProducts = async () => {
                await getCategoryProducts({
                    params: params,
                    setProducts: setProducts,
                    setTotalPage: setTotalPage,
                    setCurrentPage: setCurrentPage,
                    requestedPage: requestedPage,
                    setLoading: setLoading
                })
            }
            fetchProducts().then(r => {
            })
        }
    }, [title, requestedPage, onStock, sortBy, slug])


    const changeCurrentPage = (changeInPage) => {
        if (changeInPage > 0) {
            if (currentPage + changeInPage <= totalPage) {
                setCurrentPage(currentPage + changeInPage)
                setRequestedPage(currentPage + changeInPage)
            }

        } else if (changeInPage < 0) {
            if (currentPage + changeInPage > 0) {
                setCurrentPage(currentPage + changeInPage)
                setRequestedPage(currentPage + changeInPage)
            }
        }
    }


    return (
        <>
            <div className="container mt-4">
                <div className="row mt-1 mb-2">
                    <h4>{heading}</h4>
                </div>

                {loading === false ? <LoadingScreen></LoadingScreen> : (
                    <>
                        <div className="row mb-3 justify-content-between">
                            <div className="col d-flex align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                           onClick={(e) => {
                                               setOnStock(!onStock)
                                           }}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Stokta Olanları Göster
                                    </label>
                                </div>
                            </div>

                            <div className="col">
                                <div className="d-flex  align-items-center  justify-content-end">
                                    <select
                                        className="select-box"
                                        aria-label="Large select example"
                                        onChange={(e) => {
                                            setSortBy(e.target.value)
                                        }}
                                    >
                                        <option selected>Varsayılan Sıralama</option>
                                        <option
                                            value="new_price|asc">
                                            Artan Fiyata Göre Sırala
                                        </option>
                                        <option
                                            value="new_price|desc">
                                            Azalan Fiyata Göre Sırala
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div
                            className="row"
                        >

                            {products.map((product, index) => {
                                return (
                                    <>
                                        <ProductCart
                                            addToCart={addToCart}
                                            handleDivClick={handleDivClick}
                                            product={product}
                                        ></ProductCart>
                                    </>
                                )
                            })}

                            {((() => {
                                if (products.length === 0) {
                                    return (
                                        <>
                                            <div>
                                                Ürün bulunamadı
                                            </div>
                                        </>
                                    )
                                }
                            }))()}
                        </div>

                        <CustomPagination
                            pageCount={totalPage}
                            currentPage={currentPage}
                            changeCurrentPage={changeCurrentPage}
                        ></CustomPagination>
                    </>
                )}
            </div>
        </>
    )

}