import React from 'react';
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import "../../styles/pages/Products.css"
import {api_helper} from "../../helpers/api_helper";
import ProductCart from "../../components/ProductCart";


export default function ProductSearch() {
    const [products, setProducts] = React.useState([])
    const {title} = useParams();
    console.log(title)

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
        <div className="productsContainer">
            <span>SEARCHHH</span>
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
        </>
    )

}