import ProductCart from "../components/ProductCart";
import React from 'react';
import axios from "axios";
import {api_helper} from "../helpers/api_helper";
import {useParams} from "react-router-dom";
import "../styles/pages/Products.css"


export default function ProductsPage() {
    const [products, setProducts] = React.useState([])
    const {slug} = useParams();

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.category.view + "/" + slug)
            .then(res => {
                let result = [];
                console.log("response data ", res.data.data)
                for (const key of Object.keys(res.data.data)) {
                    //TODO SERVER ERROR FALAN OLURSA PROMP
                    //console.log(key, res.data.data[key]);
                    result.push(res.data.data[key])
                }
                setProducts(result)
                console.log("result ", products)
                console.log("fetched products with slug")
            })
            .catch(error => {
                console.log(error);
            })
    }, [slug])


    return (
        <div className="productsContainer">
            {products.map(product => (

                //TODO ARKA PLAN EKLENECEK
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
    )

}