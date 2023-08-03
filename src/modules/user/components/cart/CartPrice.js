import {colorSchema} from "../../../../helpers/ColorSchema";
import CustomButton from "../CustomButton";
import React from "react";

export default function CartPrice({total,subTotal}) {
    return (
        <>
            <div className="col offset-1">
                <div className="row mb-4">
                    <div className="col p-2" style={{
                        backgroundColor: colorSchema.cart.primary,
                        color: colorSchema.cart.primaryText,
                        fontSize: colorSchema.cart.primaryFontSize,
                        fontWeight: colorSchema.cart.primaryFontWeight
                    }}>Toplam
                    </div>
                </div>

                <div className="row" style={{borderBottom: colorSchema.cart.borderBottom}}>
                    <div className="col">Ara Toplam</div>
                    <div className="col mb-2">{subTotal}</div>
                </div>
                <br></br>
                <div className="row" style={{borderBottom: colorSchema.cart.borderBottom}}>
                    <div className="col">Vergiler</div>
                    <div className="col mb-2">20₺</div>
                </div>
                <br></br>
                <div className="row" style={{borderBottom: colorSchema.cart.borderBottom}}>
                    <div className="col">Kargo Ücreti</div>
                    <div className="col mb-2">20₺</div>
                </div>
                <br></br>
                <div className="row fw-bold"
                     style={{borderBottom: colorSchema.cart.borderBottom}}>
                    <div className="col">Toplam</div>
                    <div className="col mb-2">{total}₺</div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <CustomButton
                            text={"Alışverişi Tamamla"}
                            style={{
                                width: "max-content",
                            }}
                        ></CustomButton>
                    </div>
                </div>

            </div>
        </>
    )
}