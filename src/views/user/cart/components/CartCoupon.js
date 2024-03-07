import {colorSchema} from "../../../../utils/ColorSchema";
import CustomButton from "../../../../components/CustomButton";
import React from "react";
import {useAuth} from "../../../../context/AuthContext";
import {getCouponDiscount} from "../../../../requests/cart/CartRequests";

export default function CartCoupon({appliedCoupons, setAppliedCoupons, total, setTotal, discount, setDiscount}) {
    const [coupon, setCoupon] = React.useState("")
    const [loaded, setLoaded] = React.useState(false)
    const {secret} = useAuth();


    const checkCoupon = () => {
        if (coupon === "") {
            return;
        }

        const check = async () => {
            if (appliedCoupons.some(e => e.coupon === coupon)) {
                return;
            }
            console.log("x")
            await getCouponDiscount({
                coupon: coupon,
                discount: discount,
                setDiscount: setDiscount,
                setLoaded: setLoaded,
                secret: secret,
                setAppliedCoupons: setAppliedCoupons,
                appliedCoupons: appliedCoupons
            })
            console.log("y")

            console.log(discount)
            await setTotal(total - discount)
            console.log("total", total)

        }

        check().then(r => {
        })
    }

    const deleteCoupon = async (coupon) => {
        const newAppliedCoupons = appliedCoupons.filter(e => e.coupon !== coupon)
        await setAppliedCoupons(newAppliedCoupons)
        await setTotal(total + discount)
        await setDiscount(0)
    }

    return (
        <>
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
                    <input type="text" onChange={(e) => {
                        setCoupon(e.target.value.toUpperCase())
                        e.target.value = e.target.value.toUpperCase()
                    }}></input>
                </div>
                <div className="col">
                    <CustomButton
                        text={"Ekle"}
                        style={{width: "100%"}}
                        onClick={async () => {
                            await checkCoupon()
                        }}
                    ></CustomButton>
                </div>
            </div>


            {appliedCoupons.map((coupon) => {
                return (
                    <>
                        <div className="row d-flex justify-content-around align-items-center
                        text-center mt-2 p-2"
                             style={{
                                 backgroundColor: colorSchema.cart.secondary,
                                 color: colorSchema.cart.secondaryText,
                             }}
                        >
                            <div className="col">
                                {coupon.coupon}
                            </div>
                            <div className="col">
                                {coupon.discount}₺
                            </div>
                            <div className="col">
                                <span className="cursor-pointer text-decoration-underline"
                                      onClick={(e) => {
                                          deleteCoupon(coupon.coupon).then(r => {
                                          })
                                      }}>Çıkar</span>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}