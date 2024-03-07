import React, {useEffect, useState} from "react";
import ProductsListArea from "../../../components/user/ProductsListArea";
import MetaTags from "./components/MetaTags";
import {useNavigate, useLocation} from "react-router-dom";
import {getSearchedProducts} from "../../../requests/ProductRequests";

export default function ProductSearch() {
    const [heading, setHeading] = useState("");
    const [products, setProducts] = useState([])
    const [requestParams, setRequestParams] = useState({})
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);

    const fetchProducts = ({
                               params,
                               setTotalPage,
                               setLoading
                           }) => {
        const fetch = async () => {
            if ((requestParams.title || requestParams.title === "") && requestParams.page !== 0) {
                await getSearchedProducts({
                    params: {...params, page: params.page},
                    setTotalPage: setTotalPage,
                    setLoading: setLoading,
                    setProducts: setProducts,
                })
            }
        }

        fetch().then(r => {
        })
    }

    useEffect(() => {
        // URL parametrelerinde değişiklik olduğunda yapılacak işlemler
        if (!location.state) {
            const title = urlParams.get("title") ?? ""
            const page = urlParams.get("page") ?? 1
            const onStock = urlParams.get("onStock") ?? 0

            navigate("/products?title=" + title + "&page=" + page + "&onStock=" + onStock, {
                replace: true,
                state: {title, page, onStock}
            })
            return;
        }

        setRequestParams({
            title: location.state.title ?? "",
            page: location.state.page ?? 1,
            onStock: location.state.onStock ?? 0,
        })
    }, [location.state, navigate]);


    useEffect(() => {
        setHeading(requestParams.title + " ürünü ile ilgili arama sonuçları görüntülüyorsunuz")
    }, [requestParams.title])

    const pageNavigation = ({desiredPage}) => {
        navigate("/products?title=" + requestParams.title + "&page=" + desiredPage + "&onStock=" + requestParams.onStock, {
            replace: true,
            state: {
                title: requestParams.title,
                page: desiredPage,
                onStock: requestParams.onStock
            }
        })
    }

    const onStockNavigation = ({onStock}) => {
        navigate("/products?title=" + requestParams.title + "&page=" + requestParams.page + "&onStock=" + onStock, {
            replace: true,
            state: {
                title: requestParams.title,
                page: 1,
                onStock: onStock
            }
        })
    }


    return (
        <>
            <MetaTags title={requestParams.title}/>

            <ProductsListArea
                heading={heading}
                fetchProducts={fetchProducts}
                products={products}
                setProducts={setProducts}
                requestParams={requestParams}
                pageNavigation={pageNavigation}
                onStockNavigation={onStockNavigation}
            />
        </>
    )
}