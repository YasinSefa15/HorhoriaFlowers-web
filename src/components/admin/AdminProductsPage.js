import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";
import ImageComponent from "../ImageComponent";


export default function AdminProductsPage({product,deleteFunc}) {



    return (

        <div className="productCard">
            {//<ImageComponent image={product.images[0] ?? {file_path: "x"}} className={"productImage"}/>
                //
            }
            <div className="title-area">
                <h5 className="cardTitle">{product.title}</h5>

            </div>

            <p className="cardPrice">{product.price} ₺</p>

            <div className="multiple-buttons">
                <NavLink
                    to={"/admin/products/" + product.slug}
                    className="btn btn-outline-primary edit-button"
                    state={{product: product}}
                >
                    Düzenle
                </NavLink>

                <NavLink
                    to={"/admin/products/"}
                    onClick={(e) => {
                        deleteFunc(product.id)
                    }}
                    className="btn btn-outline-danger delete-button"
                >
                    Sil
                </NavLink>

            </div>
        </div>
    )
}