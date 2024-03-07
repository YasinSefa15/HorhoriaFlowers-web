import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getCategoryProducts, getCategoryTitleFromSlug} from "../../../requests/ProductRequests";
import ProductsListArea from "../../../components/user/ProductsListArea";
import MetaTags from "./components/MetaTags";

export default function CategoryProducts() {
    const [heading, setHeading] = useState("");
    const {slug} = useParams();
    const [products, setProducts] = useState([])
    const [requestParams, setRequestParams] = useState({})
    let location = useLocation();
    const [categoryTitle, setCategoryTitle] = useState(location.state?.title)
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        console.log("LOCATION.STATE.SLUG USE EFFECT")

        const state = location.state;
        const getCategoryTitle = async () => {
            const categoryTitle = await getCategoryTitleFromSlug({slug});
            setCategoryTitle(categoryTitle);

            setHeading(categoryTitle + " kategorisindeki ürünleri görüntülüyorsunuz")

            if (!state) {
                console.log("URL ACCESS")
                console.log(slug)
                const page = urlParams.get("page") ?? 1
                const onStock = urlParams.get("onStock") ?? 0

                console.log("NAVIGATING URL ACCESS")

                navigate("/categories/" + slug + "?page=" + page + "&onStock=" + onStock, {
                    replace: true,
                    state: {title: categoryTitle, page, onStock, slug: slug},
                })
                return;
            }

            console.log("INSIDE THE WEB ACCESS")


            if (!state.slug) {
                return;
            }

            setRequestParams({
                page: state.page ?? 1,
                onStock: state.onStock ?? 0,
                slug,
                title: categoryTitle
            })
        };

        getCategoryTitle();


    }, [location.state, slug]);//location.state.slug


    const fetchProducts = ({
                               params,
                               setTotalPage,
                               setLoading,
                           }) => {
        const fetchProductsBySlug = async () => {
            console.log("REQUEST WANTED")
            if (categoryTitle === "" || !requestParams.page) {
                return;
            }
            console.log("REQUEST SENT")

            await getCategoryProducts({
                params: {...params, slug},
                setProducts: setProducts,
                setTotalPage: setTotalPage,
                setLoading: setLoading
            })
        }
        fetchProductsBySlug().then(r => {
        })
    }

    const pageNavigation = ({desiredPage}) => {
        navigate("/categories/" + slug + "?page=" + desiredPage + "&onStock=" + requestParams.onStock, {
            replace: true,
            state: {
                title: categoryTitle,
                page: desiredPage,
                onStock: requestParams.onStock,
                slug: slug
            }
        })
    }

    const onStockNavigation = ({onStock}) => {
        navigate("/categories/" + slug + "?page=" + requestParams.page + "&onStock=" + onStock, {
            replace: true,
            state: {
                title: categoryTitle,
                page: 1,
                onStock: onStock,
                slug: slug
            }
        })
    }

    return (
        <>
            <MetaTags title={categoryTitle ?? ""}/>

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