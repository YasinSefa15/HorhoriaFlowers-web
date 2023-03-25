import ProductCart from "../components/ProductCart";
import React from 'react';
import axios from "axios";
import {api_helper} from "../helpers/api_helper";
import {useParams} from "react-router-dom";


export default function ProductsPage() {
    const [products, setProducts] = React.useState([])
    const {slug} = useParams();

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.category.view + "/" + slug)
            .then(res => {
                let result = [];
                console.log(res.data.data)
                for (const key of Object.keys(res.data.data)) {
                    //TODO SERVER ERROR FALAN OLURSA PROMP
                    //console.log(key, res.data.data[key]);
                    result.push(res.data.data[key])
                }
                setProducts(result)
                console.log("fetched")
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    return (
        <div>


            <h1>Products Page</h1>
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
    )

}