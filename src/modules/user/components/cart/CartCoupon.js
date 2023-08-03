import {colorSchema} from "../../../../helpers/ColorSchema";
import CustomButton from "../CustomButton";
import React from "react";

export default function CartCoupon() {
    return (
        <>
            <div className="col col-sm-4">
                <div className="row mb-4">
                    <div
                        className="col p-2"
                        style={{
                            backgroundColor: colorSchema.cart.primary,
                            color: colorSchema.cart.primaryText,
                            fontSize: colorSchema.cart.primaryFontSize,
                            fontWeight: colorSchema.cart.primaryFontWeight
                        }}
                    >Kupon
                    </div>
                </div>

                <div className="row d-flex align-items-center">
                    <div className="col col-sm-4">
                        Kupon Giriniz:
                    </div>
                    <div className="col">
                        <input type="text"></input>
                    </div>
                    <div className="col">
                        <CustomButton
                            text={"Ekle"}
                            style={{width: "100%"}}
                        ></CustomButton>
                    </div>
                </div>
            </div>
        </>
    )
}