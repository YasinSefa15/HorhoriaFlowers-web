import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ProductCart from "./product_cart/ProductCart";
import CustomPagination from "./pagination/CustomPagination";
import './product_cart/ProductCart.css';
import LoadingScreen from "../LoadingScreen";
import {useAuth} from "../../context/AuthContext";
import {addVisitorProductToCartIfNotExists} from "../../requests/cart/VisitorRequests";
import {addCartIfNotExists, readLoggedInUserCart} from "../../requests/cart/CartRequests";
import uuidGenerator from "../../utils/uuidGenerator";

export default function ProductsListArea({
                                             heading,
                                             fetchProducts,
                                             products,
                                             requestParams,
                                             pageNavigation,
                                             onStockNavigation
                                         }) {
    const [totalPage, setTotalPage] = React.useState(1)
    const {secret, setCartProducts} = useAuth();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState(null);
    const [loading, setLoading] = useState(false);

    const addToCart = (event, id, title, size_id) => {
        event.stopPropagation();

        if (!secret) {
            addVisitorProductToCartIfNotExists({title, id: id, quantity: 1, size_id});
            return;
        }

        const loadCartProducts = async () => {
            await addCartIfNotExists({
                id, secret, title, size_id
            })
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
        };
        loadCartProducts().then(r => {
        });

    }
    const handleDivClick = (product) => {
        navigate("/products/" + product.slug, {state: {product: product}})
    };


    useEffect(() => {
        console.log("...........", requestParams)
        if (requestParams.page === undefined) {
            return;
        }
        const params = {...requestParams, orderBy: sortBy}

        if (params.orderBy === "Varsayılan Sıralama") {
            delete params.orderBy
        }

        fetchProducts({
            params: params, //perPage can be sent
            setTotalPage: setTotalPage,
            setLoading: setLoading
        })
    }, [requestParams, sortBy]);//requestParams.title, sortBy


    const changeCurrentPage = (changeInPage) => {
        const parsedPage = parseInt(requestParams.page)

        if (changeInPage > 0) {
            if (parsedPage + changeInPage <= totalPage) {
                pageNavigation({desiredPage: parsedPage + changeInPage})
            }

        } else if (changeInPage < 0) {
            if (parsedPage + changeInPage > 0) {
                pageNavigation({desiredPage: parsedPage + changeInPage})
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
                                           defaultChecked={requestParams.onStock === "1"}
                                           onClick={(e) => {
                                               const onStock = e.target.checked ? 1 : 0;
                                                  onStockNavigation({onStock})
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
                                        <option value="Varsayılan Sıralama">Varsayılan Sıralama</option>
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
                                    <ProductCart
                                        key={uuidGenerator()}
                                        addToCart={addToCart}
                                        handleDivClick={handleDivClick}
                                        product={product}
                                    ></ProductCart>
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
                            currentPage={requestParams.page}
                            changeCurrentPage={changeCurrentPage}
                        ></CustomPagination>
                    </>
                )}
            </div>
        </>
    )

}