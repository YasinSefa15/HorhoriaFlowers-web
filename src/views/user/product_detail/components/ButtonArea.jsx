import CustomButton from "../../../../components/CustomButton";
import React from "react";

export default function ButtonArea({
                                       title,
                                       id,
                                       quantity,
                                       selectedSize,
                                       handleAddCart,
                                   }) {
    return (
        <>
            <CustomButton
                text={"Sepete Ekle"}
                style={{
                    width: "100%",
                    height: "50px",
                    cursor: selectedSize?.quantity > 0 ? "pointer" : "not-allowed"
                }}
                onClick={async () => {
                    if (selectedSize && selectedSize.quantity) {
                        await handleAddCart({
                            title,
                            id,
                            quantity,
                            size_id: parseInt(selectedSize.id),
                            size_value: selectedSize.value
                        })
                    }
                }}
            ></CustomButton>
        </>
    )
}
