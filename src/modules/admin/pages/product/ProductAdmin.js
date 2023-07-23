import React from 'react';
import axios from "axios";
import {api_helper} from "../../../../helpers/api_helper";
import "../../configs/AdminProduct.css"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import NotificationHelper from "../../../../helpers/NotificationHelper";
import 'reactjs-popup/dist/index.css';

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

        </>
    )
}