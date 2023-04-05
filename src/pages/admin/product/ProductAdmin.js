import React from 'react';
import axios from "axios";
import {api_helper} from "../../../helpers/api_helper";
import "../../../styles/pages/AdminProduct.css"
import AdminProductsPage from "../../../components/admin/AdminProductsPage";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import NotificationHelper from "../../../helpers/NotificationHelper";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PageItem from "../../../components/pagination/PageItems";
import HomePage from "../../home/HomePage";
import PageItems from "../../../components/pagination/PageItems";

export default function ProductAdmin() {
    const [totalPage, setTotalPage] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [requestedPage, setRequestedPage] = React.useState(1)
    const [products, setProducts] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [title, setTitle] = React.useState("")
    const navigate = useNavigate()



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

    //console.log("totalPage", totalPage, "currentPage", currentPage, "requestedPage", requestedPage)

    const deleteProduct = (id) => {

        axios.delete(api_helper.api_url + api_helper.product.delete, {
            data: {
                product_id: parseInt(id),
            }
        })
            .then(res => {
                console.log(res.data)
                setProducts(products.filter(product => product.id !== id))
                NotificationHelper({
                    httpStatus: res.data.status_code,
                    title: "Ürün başarıyla silindi"
                })
            })
            .catch(error => {
                console.log(error)
                NotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.statusText,
                    message: error.response.data.message,
                })
            })
    }

    React.useEffect(() => {
        let params = {
            "limit": 10,
            "offset": requestedPage,
        }
        if (title !== "") {
            params.searched = title
        }
        //todo sadece title değişince page = 1
        //page değişince sonsuz loop dsfdsfdsf
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: params
        })
            .then(res => {
                console.log("send title = ", title)
                console.log("request send")
                console.log(res.data)
                setTotalPage(res.data.meta_data.total_page)
                setCurrentPage(res.data.meta_data.current_page)

                let result = [];
                for (const key of Object.keys(res.data.data)) {
                    result.push(res.data.data[key])
                }
                setProducts(result)
            })
            .catch(error => {
                console.log(error);
                //NotificationHelper({
                //  httpStatus: error.response.status,
                //  title: error.response.statusText,
                //  message: error.response.data.message,
                //})
            })
    }, [title, requestedPage])

    return (
        <>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Aradığınız Ürünü Yazınız"
                aria-label="Search"
                style={{width: 400}}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                }}
                onKeyPress={(e) => e.key === 'Enter' &&
                    setTitle(search) && setRequestedPage(1)
                }
            />


            <NavLink to={"/admin/products?title=" + search} className="btn btn-outline-primary"
                     onClick={(e) => {
                         setTitle(search)
                         alert(title)
                     }}
            >Arat</NavLink>


            <h1>Product Admin</h1>

            <div className="productsContainer">

                {products.map(product => (
                    <AdminProductsPage
                        product={product}
                        deleteFunc={deleteProduct}
                    />
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