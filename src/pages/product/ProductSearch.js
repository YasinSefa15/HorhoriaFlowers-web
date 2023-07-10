import React from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";
import "../../styles/pages/Products.css"
import {api_helper} from "../../helpers/api_helper";
import ProductCart from "../../components/ProductCart";
import PageItems from "../../components/pagination/PageItems";


export default function ProductSearch() {
    const [totalPage, setTotalPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [requestedPage, setRequestedPage] = React.useState(1)
    const [products, setProducts] = React.useState([])
    const location = useLocation();


    const title = location.search.substring("search=".length)

    let params = {
        "limit": 5,
        "page": requestedPage,
    }
    if (title !== "") {
        params.searched = title
    }

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: params
        })
            .then(res => {
                let result = [];
                console.log(res.data.data)
                console.log(res.data)
                setTotalPage(res.data.meta.last_page)
                //setTotalPage(100)
                setCurrentPage(res.data.meta.current_page)
                //setCurrentPage(1)

                //res.data.data is an array
                res.data.data.forEach((product) => {
                    result.push(product)
                })

                //    result.push(res.data.data[key])
                setProducts(result)
                //console.log("fetched products with slug")
            })
            .catch(error => {
                console.log("error title ", error);
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
            <div className="product-search-container">
                <div className="productsContainer">
                    {products.map(product => (
                        <ProductCart product={{
                            title: product.title,
                            slug: product.slug,
                            category_id: product.category_id,
                            description: product.description,
                            price: product.price,
                            images: product.images
                        }}/>
                    ))}

                </div>

                <div className="pagination-container">
                    <div className=" row justify-content-md-center">
                        <ul className="pagination col-md-auto">
                            <li
                                className={"page-item " + (currentPage === 1 ? "disabled" : "")}
                                onClick={() => {
                                    changeCurrentPage(-1)
                                }}
                            >
                                <span className="page-link">Previous</span>
                            </li>

                            <PageItems pageCount={totalPage}
                                       currentPage={requestedPage}
                                       changeCurrentPage={changeCurrentPage}
                            />

                            <li
                                className={"page-item " + (currentPage === totalPage ? "disabled" : "")}
                                onClick={() => {
                                    changeCurrentPage(1)
                                }}
                            >
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        </>
    )

}