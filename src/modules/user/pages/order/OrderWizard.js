import OrderStep1 from "./steps/OrderStep1";
import {useEffect, useState} from "react";
import CustomButton from "../../components/CustomButton";
import OrderStep2 from "./steps/OrderStep2";
import OrderStep3 from "./steps/OrderStep3";
import {useAuth} from "../../../../context/AuthContext";

export default function OrderWizard({total}) {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isOrdered, setIsOrdered] = useState(false)
    const {secret} = useAuth()

    const steps = [
        {
            name: 'Adres Seç', component: <OrderStep1
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
                secret={secret}
            />
        },
        {
            name: 'Sipari Onayı', component: <OrderStep2
                selectedAddressId={selectedAddressId}
                secret={secret}
                total={total}
            />
        },
    ]


    const [currentStep, setCurrentStep] = useState(0)

    const handleOrder = () => {
        setIsOrdered(true)
    }


    return (
        <>

            <div className="container">
                <div className="row d-flex mb-3">
                    {
/*isOrdered ise para isteme ekranını aç*/
                        steps.map((step, index) => {
                        return (
                            <div key={step.name}
                                 className={`col order-step ${index <= currentStep ? "active" : ""}
                                 ${index === currentStep ? " selected" : ""}`}
                            >
                                <span className="order-step-name">{step.name}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="row mb-4">
                    {steps[currentStep].component}
                </div>


                <div className="row">
                    <div className="col">
                        {currentStep === 0 ? (<></>) : (<>
                            <CustomButton
                                text="Geri"
                                onClick={() => {
                                    if (currentStep > 0) {
                                        setCurrentStep(currentStep - 1)
                                    }
                                }}
                                style={{
                                    width: "40%",
                                }}
                            ></CustomButton>
                        </>)}
                    </div>

                    <div className="col d-flex justify-content-end mb-5">
                        <CustomButton
                            text= {currentStep === steps.length - 1 ? "Siparişi Onayla" : "İleri"}
                            onClick={() => {
                                if (currentStep < steps.length - 1 && selectedAddressId) {
                                    setCurrentStep(currentStep + 1)
                                }else if(currentStep === steps.length - 1) {
                                    console.log("siparişi onayla")
                                }

                            }}
                            style={{
                                width: "40%",
                                cursor: selectedAddressId ? "pointer" : "not-allowed"
                            }}
                        ></CustomButton>
                    </div>
                </div>
            </div>


        </>
    )
}