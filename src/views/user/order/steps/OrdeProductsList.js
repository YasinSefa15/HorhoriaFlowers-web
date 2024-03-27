import React, {useEffect} from "react";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function OrderProductsLists({products, setProductsTotal}) {
    useEffect(() => {
        let total = 0;
        products.map((product) => {
            total += product.new_price * product.quantity
        })
        setProductsTotal(total)
    }, []);

    return (
        <>
            <div className="row mt-4">
                {products.map((product) => (
                    <div key={uuidGenerator()} className="col col-sm-2 d-flex flex-wrap">
                        <div className="">
                            <img
                                src={product.image.file_path}
                                style={{
                                    width: "133px",
                                    height: "133px",
                                    objectFit: "cover",
                                    marginRight: "20px",
                                }}
                            ></img>
                        </div>

                        <div>
                            <p style={{fontSize: "20px", cursor: "pointer"}}
                            >{product.title}</p>
                            <div className="row">
                                <small>Fiyat: {product.new_price} ₺</small>
                                <small>Miktar: {product.quantity}</small>
                                <small>Toplam: {product.quantity * product.new_price} ₺</small>
                            </div>
                            <br/>
                        </div>
                    </div>

                ))}
                <hr className="mt-4 opacity-25"></hr>
            </div>
        </>
    )
}