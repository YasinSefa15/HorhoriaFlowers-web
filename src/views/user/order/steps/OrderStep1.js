import React, {useState} from "react";
import {createProfileAddresses, getProfileAddresses} from "../../../../requests/profile/ProfileRequests";
import CustomButton from "../../../../components/CustomButton";
import CreateAddressModal from "../../profile/components/address/CreateAddressModal";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function OrderStep1({selectedAddressId, setSelectedAddressId, secret}) {
    const [addresses, setAddresses] = React.useState([]);

    const [loaded, setLoaded] = React.useState(false);
    const [addressForm, setAddressForm] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    React.useEffect(() => {
        const fetchAddresses = async () => {
            await getProfileAddresses({setAddresses, setLoaded, secret})
        }

        fetchAddresses().then(() => {
            //console.log("addresses", addresses)
        })
    }, [])

    const handleAddressCreate = async () => {
        const post = async () => {
            await createProfileAddresses({
                addressForm,
                addresses,
                setAddresses,
                setLoaded,
                secret,
                setValidationErrors
            })

        }

        await post()
    }

    return (
        <>
            <div>
                <h2>Kayıtlı Adreslerim</h2>

                <div className="row justify-content-end me-5 mb-2">
                    <CustomButton
                        status="success"
                        text="Adres Ekle"
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                    </CustomButton>
                </div>

                <div className="row">
                    {addresses.map((address) => (
                        <React.Fragment key={uuidGenerator()}>
                            <div
                                className="col col-sm-4 col-md-3 text-center"
                                key={address.id}
                            >
                                <input className="me-2" type="radio"
                                       id="html" name="fav_language" value={address.title}
                                       checked={selectedAddressId === address.id}
                                       onChange={() => {
                                           console.log("selectedAddressId", address.id)
                                           setSelectedAddressId((prev) => {
                                               return address.id
                                           })
                                       }}
                                />
                                <label htmlFor={address.title}>{address.title}</label>
                                <div className="address-body">
                                    <div>
                                        <p>{address.first_name} {address.last_name}</p>
                                        <p>{address.state}/{address.city}</p>
                                        <p>{address.description}</p>
                                        <p>{address.phone}</p>
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                    ))}

                    <CreateAddressModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        addressForm={addressForm}
                        setAddressForm={setAddressForm}
                        handleAddressCreate={handleAddressCreate}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                    ></CreateAddressModal>
                </div>
            </div>
        </>
    )
}