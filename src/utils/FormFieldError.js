import React from "react";

export default function FormFieldError({errorMessage}) {
    return (
        <>
            <div className="row mt-2">
                <div
                    className="invalid-feedback d-flex justify-content-center">{errorMessage}</div>
            </div>
        </>
    )
}