import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {api_helper} from "../../../../helpers/api_helper";
import ProductCart from "./ProductCart";
import {createLoggedInUserProduct, readLoggedInUserCart} from "../../../../api.requests/cart/CartRequests";
import {useAuth} from "../../../../context/AuthContext";
import CustomPagination from "../pagination/CustomPagination";

export default function Products() {
    const [totalPage, setTotalPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [requestedPage, setRequestedPage] = React.useState((new URLSearchParams(window.location.search)).get("page") || 1)
    const [products, setProducts] = React.useState([])
    const {secret, setCartProducts} = useAuth();
    const navigate = useNavigate();

    const addToCart = (event, id, title) => {
        event.stopPropagation();
        createLoggedInUserProduct({
            product_id: id,
            secret: secret,
            product_title: title,
        })

        const loadCartProducts = async () => {
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
            console.log("cart products loaded");
        };
        loadCartProducts().then(r => {
        });

    }

    const handleDivClick = (product) => {
        navigate("/products/" + product.slug, {state: {product: product}})
    };

    const urlParams = new URLSearchParams(window.location.search);
    //setRequestedPage(urlParams.get("page") || 1)
    const title = urlParams.get("title")

    let params = {
        "limit": 10,
        "page": requestedPage,
        "title": title
    }

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: params
        })
            .then(res => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", requestedPage.toString())

                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.pushState({}, '', newUrl);

                let result = [];
                setTotalPage(res.data.meta.last_page)
                setCurrentPage(res.data.meta.current_page)

                res.data.data.forEach((product) => {
                    result.push(product)
                })
                setProducts(result)
                window.scrollTo({top: 0, behavior: 'smooth'});
            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
    }, [title, requestedPage])

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
            </div>
        </>
    )

}