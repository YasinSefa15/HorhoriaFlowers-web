import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ImageComponent from "./ImageComponent";
import {Link} from "react-router-dom";

export default function ProductCart({product}) {
    const [visibleOrder, setVisibleOrder] = React.useState(0)

    return (
        <div className="productCard"
        >
            {(() => {
                if (product.images.length > 0) {
                    return (
                        <div className="image-container">
                            <ImageComponent images={product.images}
                                            visibleOrder={visibleOrder}
                            />

                            <div className="image-indicator-container">
                                {product.images.map((image, index) =>
                                    <div
                                        className={"image-indicator " + (visibleOrder === image.order_of ? "active" : "")}
                                        onMouseOver={(e) => {
                                            //console.log("image clicked", e)
                                            //console.log(index)
                                            setVisibleOrder(index)
                                            //console.log("visible order", visibleOrder)
                                            //get element by class name
                                        }}
                                    >
                                        <div className="chose-pic">

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            })()}


            <h5 className="cardTitle">{product.title}</h5>
            <p className="cardPrice">{product.new_price}₺</p>
            <Link
                to={"/products/" + product.slug}
                state={{product: product}}
                className="btn btn-outline-primary orderButton"
            >
                İncele
            </Link>

        </div>
    )
}

//todo indicator eşit bölünsün maks 3 resim ilk başta