import 'bootstrap/dist/css/bootstrap.min.css';
import ImageComponent from "./ImageComponent";

export default function ProductCart({product}) {
    return (

        <div className="card" style={{width: "18rem"}}>
            <ImageComponent image={product.images[0]}/>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
            </div>
        </div>
    )
}