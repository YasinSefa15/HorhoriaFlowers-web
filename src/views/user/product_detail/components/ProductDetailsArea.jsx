import InnerCategoryList from "./InnerCategoryList";
import ImagesField from "./ImagesField";
import StarRatingComponent from "../../../../components/user/StarRatingComponent";
import Size from "./Size";
import QuantityField from "./QuantiityField";
import ButtonArea from "./ButtonArea";
import React from "react";

export default function ProductDetailsArea({
                                                  product,
                                                  mainImage,
                                                  changeImage,
                                                  handleSizeChange,
                                                  selectedSize,
                                                  quantity,
                                                  setQuantity,
                                                  handleAddCart,
                                           }) {
    return (
        <>
            <InnerCategoryList categories={product.categories}/>

            <div className="row justify-content-center">
                <div className="offset-lg-2 col-lg-4 col-md-8 col-12">
                    <ImagesField
                        mainImage={mainImage}
                        changeImage={changeImage}
                        title={product.title}
                        images={product.images}
                    />
                </div>

                <div className="col-lg-6 col-md-4 col-12">
                    <div className="product-detail-title text-center">
                        <h1 className="py-4">{product.title}</h1>
                    </div>

                    <div
                        className="product-detail-price d-flex flex-column text-center align-items-center"
                        style={{
                            marginTop: "-10px"
                        }}
                    >
                        <hr className="w-25"></hr>

                        <h2 className="fw-bold">{product.new_price}₺</h2>

                        <StarRatingComponent
                            rating={product.average_rating}
                        ></StarRatingComponent>

                    </div>


                    <div className="d-flex justify-content-center">
                        <Size handleSizeChange={handleSizeChange} sizes={product.sizes}/>
                    </div>


                    <div className="product-detail-action row justify-content-center ">
                        <hr className="w-75 mt-2"></hr>

                        <div className="row justify-content-center mt-2">

                            <div
                                className="product-detail-quantity col-md-4 d-flex align-items-center"
                                style={{width: "max-content"}}
                            >
                                <QuantityField quantity={quantity} setQuantity={setQuantity}/>
                            </div>

                            <div className={"col-md-5"}>
                                <ButtonArea
                                    title={product.title}
                                    id={product.id}
                                    quantity={quantity}
                                    selectedSize={selectedSize}
                                    handleAddCart={handleAddCart}
                                />
                            </div>
                        </div>
                    </div>


                    {selectedSize.quantity === 0 &&
                        <div className="text-center mt-3">
                            <span className="text-danger">Bu beden stoklarımızda tükenmiştir.</span>
                        </div>}

                    <br></br>

                    <div className="d-flex justify-content-center">
                        <hr className="w-75"></hr>
                    </div>


                    <h4 className="mt-5 mb-5 text-uppercase">Ürün Detayları</h4>

                    <div
                        style={{
                            backgroundColor: "#efe7e7",
                            padding: "20px",
                        }}
                    >{product.description}</div>
                </div>
            </div>
        </>
    )
}