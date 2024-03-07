import React from "react";

export default function QuantityField({quantity, setQuantity}) {
    return (
        <>
            <div
                style={{
                    width: "30px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                    borderLeft: "1px solid #000",
                    cursor: "pointer"
                }}
                onClick={() => {
                    if (quantity > 1) {
                        setQuantity(quantity - 1)
                    }
                }}
            >
                -
            </div>


            <div
                style={{
                    width: "30px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                }}
            >
                {quantity}
            </div>

            <div
                style={{
                    width: "30px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                    borderRight: "1px solid #000",
                    cursor: "pointer"
                }}
                onClick={() => {
                    setQuantity(quantity + 1)
                }}
            >
                +
            </div>
        </>
    )
}
