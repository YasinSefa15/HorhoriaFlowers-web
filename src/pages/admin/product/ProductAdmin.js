import React from 'react';
import axios from "axios";
import {api_helper} from "../../../helpers/api_helper";
import "../../../styles/pages/AdminProduct.css"
import AdminProductsPage from "../../../components/admin/AdminProductsPage";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import NotificationHelper from "../../../helpers/NotificationHelper";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ProductAdmin() {
    const [products, setProducts] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [title, setTitle] = React.useState("")
    const navigate = useNavigate()
    console.log(useParams())
    console.log("deneme")

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
        //todo param yolla
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: {
                "products.title": title,
            }
        })
            .then(res => {
                console.log("send title = ", title)
                console.log("request send")
                console.log(res.data.data)
                let result = [];
                for (const key of Object.keys(res.data.data)) {
                    result.push(res.data.data[key])
                }
                setProducts(result)
            })
            .catch(error => {
                console.log(error);
            })
    }, [title])

    return (
        <>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Aradığınız Ürünü Yazınız"
                aria-label="Search"
                style={{width: 400}}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' &&

                    navigate("/admin/products?title=" + search)
                }
            />


            <NavLink to={"/admin/products?title=" + search} className="btn btn-outline-primary"
                     onClick={(e) => {
                         setTitle(search)
                         alert(title)
                     }}
            >Arat</NavLink>


            <Popup trigger={<button>Trigger</button>} position="top left">
                {close => (
                    <div>
                        Content here
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                    </div>
                )}
            </Popup>

            <h1>Product Admin</h1>

            <div className="productsContainer">

                {products.map(product => (
                    <AdminProductsPage
                        product={product}
                        deleteFunc={deleteProduct}
                    />
                ))}
            </div>
        </>
    )
}