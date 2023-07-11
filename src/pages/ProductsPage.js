import ProductCart from "../components/ProductCart";
import React from 'react';
import axios from "axios";
import {api_helper} from "../helpers/api_helper";
import {useParams} from "react-router-dom";
import "../styles/pages/ProductsPage.css"

export default function ProductsPage() {
    const [products, setProducts] = React.useState([])
    const {slug} = useParams();

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.category.view + slug)
            .then(res => {
                let result = [];
                for (const key of Object.keys(res.data.data)) {
                    //console.log(key, res.data.data[key]);
                    result.push(res.data.data[key])
                }
                setProducts(result)
                console.log("result ", result)
                console.log("fetched products with slug")
            })
            .catch(error => {
                console.log(error);
            })
    }, [slug])


    return (
        <div className="productsContainer">
            {products.map(product => (
                <ProductCart product={{
                    id: product.id,
                    title: product.title,
                    slug: product.slug,
                    description: product.description,
                    old_price: product.old_price,
                    new_price: product.new_price,
                    images: product.images,
                }}/>
            ))}
        </div>
    )

}