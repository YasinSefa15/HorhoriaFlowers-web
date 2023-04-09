import React from 'react';
import axios from "axios";
import {NavLink, useLocation, useParams} from "react-router-dom";
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
        "limit": 10,
        "offset": requestedPage,
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
                setTotalPage(res.data.meta_data.total_page)
                setCurrentPage(res.data.meta_data.current_page)

                for (const key of Object.keys(res.data.data)) {
                    //TODO SERVER ERROR FALAN OLURSA PROMP
                    //console.log(key, res.data.data[key]);
                    result.push(res.data.data[key])
                }
                setProducts(result)
                console.log("fetched products with slug")
            })
            .catch(error => {
                console.log(error);
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
            <div className="productsContainer">
                {products.map(product => (
                    //TODO ARKA PLAN EKLENECEK
                    <ProductCart product={{
                        title: product.title,
                        slug: product.slug,
                        category_id: product.category_id,
                        description: product.description,
                        price: product.price,
                        images: [
                            {
                                file_path: "https://picsum.photos/200/300",
                                order_of: 0,
                                type: 0,
                                product_id: 1,
                                product_title: "Product 1"
                            }
                        ]
                    }}/>
                ))}

            </div>

            <nav className="pagination-container">
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

            </nav>
        </>
    )

}