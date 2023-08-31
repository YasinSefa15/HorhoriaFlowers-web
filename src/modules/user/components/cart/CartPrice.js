import {colorSchema} from "../../../../helpers/ColorSchema";
import CustomButton from "../CustomButton";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function CartPrice({total, subTotal, discount, cargoPrice,appliedCoupons}) {
    const navigate = useNavigate();

    return (
        <>
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
                <div className="col mb-2">{subTotal} ₺</div>
            </div>


            <br></br>

            <div className="row" style={{borderBottom: colorSchema.cart.borderBottom}}>
                <div className="col">Kargo Ücreti</div>
                <div className="col mb-2">{cargoPrice} ₺</div>
            </div>

            <br></br>

            {((() => {
                if (discount > 0) {
                    return (
                        <>
                            <div className="row"
                                 style={{borderBottom: colorSchema.cart.borderBottom}}>
                                <div className="col">Kupon İndirimi</div>
                                <div className="col mb-2">-{discount} ₺</div>
                            </div>
                            <br></br>
                        </>
                    )
                }
            }))()}


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
                        onClick={() => navigate("/order", {
                            state: {
                                total: total,
                                coupons: appliedCoupons,
                            }
                        })}
                    ></CustomButton>
                </div>
            </div>
        </>
    )
}