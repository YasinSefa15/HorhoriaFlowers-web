import React from "react";
import CustomButton from "../../../../components/CustomButton";
import FormFieldError from "../../../../utils/FormFieldError";

export default function AdminProductSizesComp({validationErrors, newData, setNewData}) {
    return (
        <>
            <div className={"row " + (validationErrors.sizes ? "border p-1 rounded border-danger" : "")}>
                <div className="col">
                    <div className="d-flex justify-content-between mb-2">
                        Bedenler
                        <CustomButton
                            text={"Ekle"}
                            style={{width: "10%"}}
                            onClick={() => {
                                let sizesForm = newData?.new_sizes || []
                                sizesForm.push({
                                    value: "",
                                    quantity: 0
                                })
                                setNewData({...newData, new_sizes: sizesForm})
                            }}
                        />
                    </div>
                    <div className="bg-body-secondary p-3">
                        {newData?.new_sizes && newData?.new_sizes.map((size, index) => {
                            if (size.is_deleted) {
                                return (<> </>);
                            }
                            return (
                                <React.Fragment key={index}>
                                    <div className="prod-sizes-list d-flex justify-content-between">
                                        <div>
                                            <div className="d-flex align-items-center">
                                                <input type="text" className="form-control w-50 me-2"
                                                       value={size.value}
                                                       onChange={(e) => {
                                                           let sizesForm = newData?.new_sizes || []
                                                           sizesForm[index].value = e.target.value
                                                           setNewData({...newData, new_sizes: sizesForm})
                                                       }}
                                                />
                                                Beden
                                            </div>
                                        </div>

                                        <div>
                                            <div className="d-flex align-items-center">
                                                <input type="text" className="form-control w-25 me-2"
                                                       value={size.quantity}
                                                       onChange={(e) => {
                                                           let sizesForm = newData?.new_sizes || []
                                                           sizesForm[index].quantity = e.target.value
                                                           setNewData({...newData, new_sizes: sizesForm})
                                                       }}
                                                />
                                                Adet
                                            </div>
                                        </div>

                                        <CustomButton
                                            text="Çıkart"
                                            style={{width: "min-content", padding: "0 8px"}}
                                            onClick={() => {
                                                let sizesForm = newData?.new_sizes || []
                                                if (sizesForm[index].id) {
                                                    sizesForm[index].is_deleted = true
                                                } else {
                                                    sizesForm.splice(index, 1)
                                                }
                                                setNewData({...newData, new_sizes: sizesForm})
                                            }}/>
                                    </div>
                                    {index !== newData?.new_sizes.length - 1 && (
                                        <hr></hr>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <FormFieldError errorMessage={validationErrors['sizes.new_sizes']}/>
                    <FormFieldError errorMessage={validationErrors['sizes.updated_sizes']}/>
                    <FormFieldError errorMessage={validationErrors['sizes.deleted_sizes']}/>
                </div>
            </div>
            <FormFieldError errorMessage={validationErrors['sizes']}/>
        </>
    );
}