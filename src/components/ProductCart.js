import 'bootstrap/dist/css/bootstrap.min.css';
import ImageComponent from "./ImageComponent";
import {NavLink} from "react-router-dom";

export default function ProductCart({product}) {
    return (

        <div className="productCard">
            <ImageComponent image={product.images[0]} className={"productImage"}/>
            <h5 className="cardTitle">{product.title}</h5>
            <p className="cardPrice">{product.price} ₺</p>
            <NavLink to={"/products/" + product.slug} className="btn btn-outline-primary orderButton">İncele</NavLink>
        </div>
    )
}