import React, {useState} from "react";
import "./Profile.css"
import {
    createProfileAddresses, deleteProfileAddresses,
    getProfileAddresses,
    updateProfileAddresses
} from "../../../../requests/profile/ProfileRequests";
import {useAuth} from "../../../../context/AuthContext";
import CustomButton from "../../../../components/CustomButton";
import UpdateAddressModal from "./address/UpdateAddressModal";
import CreateAddressModal from "./address/CreateAddressModal";
import DeleteAddressModal from "./address/DeleteAddressModal";
import {Helmet} from "react-helmet";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function ProfileAddresses() {
    const [addresses, setAddresses] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [updateShowModal, setUpdateShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const [addressForm, setAddressForm] = useState({});
    const [updateAddressForm, setUpdateAddressForm] = useState({});
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [validationErrors, setValidationErrors] = useState({})
    const {secret} = useAuth()


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
            await createProfileAddresses({addressForm, addresses, setAddresses, setLoaded, secret})
                .then(() => {
                })
        }

        await post()
    }

    const handleAddressUpdate = async () => {
        const post = async () => {
            await updateProfileAddresses({updateAddressForm, addresses, setAddresses, setLoaded, secret})
                .then(() => {
                })
        }
        await post()
    }

    const handleAddressDelete = async () => {
        const post = async () => {
            await deleteProfileAddresses({selectedAddressId, addresses, setAddresses, setLoaded, secret})
                .then(() => {
                })
        }
        await post()
    }

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Adreslerim</title>
                <meta name="description"
                      content="Hooria e-ticaret platformunda kayıtlı adreslerinizi görüntüleyin, düzenleyin ve yönetin. Adreslerinizi güncelleyin ve farklı teslimat adresleri ekleyin."/>
            </Helmet>

            <div>
                <h2>Kayıtlı Adreslerim</h2>

                <div className="row justify-content-end me-5">
                    <CustomButton
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
                                className="col col-sm-6 col-md-4 "
                            >
                                <div className="address-title">
                                    {address.title}
                                </div>
                                <div className="address-body">
                                    <div>
                                        <p>{address.first_name} {address.last_name}</p>
                                        <p>{address.state}/{address.city}</p>
                                        <p>{address.description}</p>
                                        <p>{address.phone}</p>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-start">
                                            <CustomButton
                                                text={<i className="fa-regular fa-trash-can"></i>}
                                                onClick={() => {
                                                    setDeleteShowModal(true)
                                                    setSelectedAddressId(address.id)
                                                }}
                                                status="danger_transparent"
                                                style={{
                                                    padding: "0px 10px 0px 10px",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                            </CustomButton>
                                        </div>
                                        <div className="col d-flex justify-content-end">
                                            <CustomButton
                                                text="Düzenle"
                                                onClick={() => {
                                                    setUpdateShowModal(true)
                                                    setUpdateAddressForm(address)
                                                }}
                                                status="info_transparent"
                                                style={{
                                                    padding: "0px 10px 0px 10px",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>

                    ))}
                </div>
            </div>


            <CreateAddressModal
                showModal={showModal}
                setShowModal={setShowModal}
                addressForm={addressForm}
                setAddressForm={setAddressForm}
                handleAddressCreate={handleAddressCreate}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
            ></CreateAddressModal>

            <DeleteAddressModal
                showModal={deleteShowModal}
                setShowModal={setDeleteShowModal}
                handleAddressDelete={handleAddressDelete}

            ></DeleteAddressModal>

            <UpdateAddressModal
                updateShowModal={updateShowModal}
                setUpdateShowModal={setUpdateShowModal}
                updateAddressForm={updateAddressForm}
                setUpdateAddressForm={setUpdateAddressForm}
                handleAddressUpdate={handleAddressUpdate}
            ></UpdateAddressModal>
        </>
    )
}