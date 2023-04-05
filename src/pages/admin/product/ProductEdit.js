import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import {api_helper} from "../../../helpers/api_helper";
import 'react-notifications-component/dist/theme.css'
import NotificationHelper from "../../../helpers/NotificationHelper";


export default function ProductEdit() {
    document.title = "Ürün Düzenle"

    const location = useLocation();
    const {state} = location;
    const product = state.product;

    const [title, setTitle] = React.useState(product.title);
    const [description, setDescription] = React.useState(product.description);
    const [price, setPrice] = React.useState(product.price);
    const [images, setImages] = React.useState(product.images);
    const [category_id, setCategory_id] = React.useState(product.category_id);
    const [quantity, setQuantity] = React.useState(product.quantity);

    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.category.list)
            .then(res => {
                console.log(res.data.data)
                let result = [];
                for (const key of Object.keys(res.data.data)) {
                    result.push({id: res.data.data[key].id, title: res.data.data[key].title})
                }
                setCategories(result)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    console.log(product)

    const updateProduct = () => {
        axios.put(api_helper.api_url + api_helper.product.update, {
            product_id: product.id,
            title: title,
            description: description,
            price: price,
            images: images,
            category_id: category_id,
            quantity: quantity,
        })
            .then(res => {
                console.log(res.data);
                NotificationHelper({
                    httpStatus: res.data.status_code,
                    title: "Ürün başarıyla güncellendi"
                })
            })
            .catch(error => {
                console.log(error);
                NotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.statusText,
                    message: error.response.data.message,
                })
            })
    }

    return (
        <div className="formContainer">

            <div className="justify-content-lg-start">
                <b>Ürün Düzenle</b>
                <hr className="lineBreak"/>
            </div>

            <div className="inputContainer">
                <label htmlFor="title" className="form-label">Ürün Başlığı</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>

            <div className="inputContainer">
                <label htmlFor="description" className="form-label">Ürün Açıklaması</label>
                <textarea
                    className="form-control"
                    id="title"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>

            <div className="inputContainer">
                <label htmlFor="price" className="form-label">Ürün Fiyatı</label>
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
            </div>

            <div className="inputContainer">
                <label htmlFor="quantity" className="form-label">Ürün Adeti</label>
                <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                />
            </div>

            <div className="inputContainer">
                <label htmlFor="category_id" className="form-label">Ürün Kategorisi</label>
                <br/>
                <select
                    id="category_id"
                    onChange={(event) => setCategory_id(parseInt(event.target.value))}
                    className="mb-3 align-items-center"
                    value={category_id.toString()}
                >
                    {
                        categories.map((category) => {
                            return <option value={category.id}>{category.title}</option>
                        })
                    }
                </select>
            </div>


            <div className="singleButtonArea">
                <button
                    type="submit"
                    className="btn btn-primary w-25"
                    onClick={updateProduct}
                >
                    Submit
                </button>

            </div>

        </div>
    )
}