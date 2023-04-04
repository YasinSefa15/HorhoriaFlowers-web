import React from 'react';
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import "../../styles/pages/Products.css"
import {api_helper} from "../../helpers/api_helper";
import ProductCart from "../../components/ProductCart";


export default function CartPage() {
    const [products, setProducts] = React.useState([])
    const {title} = useParams();
    console.log(title)
    console.log(useParams())

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: {
                "products.title": title
            }
        })
            .then(res => {
                let result = [];
                console.log(res.data.data)
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
    }, [title])


    return (

        <>
            CARTT
        </>
    )

}