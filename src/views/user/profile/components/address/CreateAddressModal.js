import {Modal} from "react-bootstrap";
import CustomButton from "../../../../../components/CustomButton";
import React, {useEffect} from "react";
import FormFieldError from "../../../../../utils/FormFieldError";
import PhoneInput from "react-phone-input-2";
import {isInputInvalid} from "../../../../../utils/StyleUtility";

export default function CreateAddressModal({
                                               showModal,
                                               setShowModal,
                                               addressForm,
                                               setAddressForm,
                                               handleAddressCreate,
                                               validationErrors,
                                               setValidationErrors
                                           }) {
    useEffect(() => {
        if (Object.keys(validationErrors).length === 0) {
            setShowModal(false)
            setAddressForm({})
        }
    }, [validationErrors]);


    const handleCloseModal = () => {
        setShowModal(false)
        setAddressForm({})
        setValidationErrors({})
    }

    return (
        <>
            <Modal show={showModal} onHide={() => {
                handleCloseModal()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Adres Oluştur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <label htmlFor="title">Adres Başlığı</label>
                            <input type="text"
                                   className={"form-control " + (validationErrors.title ? "is-invalid" : "")}
                                   id="title"
                                   placeholder="Ev, İş, Diğer"
                                   value={addressForm.title || ''}
                                   onChange={(e) => {
                                       setAddressForm({...addressForm, title: e.target.value})
                                   }}/>
                            <FormFieldError errorMessage={validationErrors['title']}/>
                        </div>


                        <div className="row">
                            <div className="col">
                                <label>Adınız</label>
                                <input type="text"
                                       placeholder="Adınız"
                                       className={"form-control " + (validationErrors.first_name ? "is-invalid" : "")}
                                       id="first_name"
                                       value={addressForm.first_name || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, first_name: e.target.value})
                                       }}/>
                                <FormFieldError errorMessage={validationErrors['first_name']}/>
                            </div>

                            <div className="col">
                                <label htmlFor="last_name">Soyadınız</label>
                                <input type="text"
                                        placeholder="Soyadınız"
                                       className={"form-control " + (validationErrors.last_name ? "is-invalid" : "")}
                                       id="last_name"
                                       value={addressForm.last_name || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, last_name: e.target.value})
                                       }}/>
                                <FormFieldError errorMessage={validationErrors['last_name']}/>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="city">Şehir</label>
                                <input type="text"
                                       placeholder="Afyon, Eskişehir..."
                                       className={"form-control " + (validationErrors.city ? "is-invalid" : "")}
                                       id="city"
                                       value={addressForm.city || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, city: e.target.value})
                                       }}/>
                                <FormFieldError errorMessage={validationErrors['city']}/>
                            </div>

                            <div className="col">
                                <label htmlFor="state">İlçe</label>
                                <input type="text"
                                       placeholder="Merkez, Odunpazarı..."
                                       className={"form-control " + (validationErrors.state ? "is-invalid" : "")}
                                       id="state"
                                       value={addressForm.state || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, state: e.target.value})
                                       }}/>
                                <FormFieldError errorMessage={validationErrors['state']}/>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <label htmlFor="col">Telefon Numaranız</label>
                            <PhoneInput
                                country={'tr'}
                                onlyCountries={['tr']}
                                placeholder={'+90 512 345 67 89'}
                                countryCodeEditable={false}
                                inputStyle={isInputInvalid(!!validationErrors['phone'])}
                                inputClass={'w-100'}
                                value={addressForm.phone}
                                onChange={phone => setAddressForm({...addressForm, phone: phone})}
                            />
                            <FormFieldError errorMessage={validationErrors['phone']}/>
                        </div>

                        <br></br>

                        <div className="row">
                            <label htmlFor="col">Adres Detayı</label>
                            <textarea
                                placeholder="Sokak bilgisi, apartman, kat, daire..."
                                className={"form-control " + (validationErrors.description ? "is-invalid" : "")}
                                id="description" value={addressForm.description || ''}
                                onChange={(e) => {
                                    setAddressForm({...addressForm, description: e.target.value})
                                }}/>
                            <FormFieldError errorMessage={validationErrors['description']}/>
                        </div>
                        <br></br>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            handleCloseModal()
                        }}
                        status="danger"
                    >
                    </CustomButton>

                    <CustomButton
                        text="Oluştur"
                        onClick={handleAddressCreate}
                        status="success"
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}