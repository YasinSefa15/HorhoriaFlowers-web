import {Modal} from "react-bootstrap";
import FormFieldError from "../../../../utils/FormFieldError";
import PhoneInput from "react-phone-input-2";
import CustomButton from "../../../../components/CustomButton";
import React, {useEffect, useRef, useState} from "react";

export default function UpdateUserModal({
                                            showModal,
                                            setShowModal,
                                            handleSubmit,
                                            selectedUser
                                        }) {
    const [validationErrors, setValidationErrors] = useState({});
    const [newData, setNewData] = useState({})
    const originalData = useRef()

    const handleInputChange = (e) => {
        setNewData({...newData, [e.target.name]: e.target.value})
    }
    const handleClose = () => {
        setShowModal(false)
        setNewData({...originalData.current})
    }

    useEffect(() => {
        if (Object.keys(validationErrors).length === 0) {
            handleClose()
        }
    }, [validationErrors]);

    useEffect(() => {
        setNewData({...selectedUser})
        originalData.current = {...selectedUser}
        console.log(selectedUser)
    }, [selectedUser]);

    const handleOnSubmitForm = () => {
        if (JSON.stringify(originalData.current) !== JSON.stringify(newData)) {
            handleSubmit({newData, setValidationErrors})
        } else {
            handleClose()
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kullanıcı Düzenle</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="first_name">Ad</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors['first_name'] ? 'is-invalid' : ''}`}
                                    id="first_name"
                                    name="first_name"
                                    value={newData.first_name}
                                    placeholder="Ad giriniz"
                                    onChange={handleInputChange}
                                />
                                <FormFieldError errorMessage={validationErrors['first_name']}/>
                            </div>

                            <div className="col">
                                <label htmlFor="last_name">Soyad</label>
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors['last_name'] ? 'is-invalid' : ''}`}
                                    id="last_name"
                                    name="last_name"
                                    value={newData.last_name}
                                    placeholder="Soyad giriniz"
                                    onChange={handleInputChange}
                                />
                                <FormFieldError errorMessage={validationErrors['last_name']}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>Telefon Numarası</label>

                                <PhoneInput
                                    country={'tr'}
                                    onlyCountries={['tr']}
                                    placeholder={'123 456 78 90'}
                                    disableCountryCode={true}
                                    //inputStyle={isInvalidStyle(!!validationErrors['phone'])}
                                    inputClass={'w-100'}
                                    value={newData.phone}
                                    onChange={phone => setNewData({...newData, phone: phone})}
                                />
                                <FormFieldError errorMessage={validationErrors['phone']}/>
                            </div>

                            <div className="col">
                                <label htmlFor="is_admin">Admin</label>

                                <input type="checkbox"
                                       className={`form-check-input ${validationErrors['is_admin'] ? 'is-invalid' : ''}`}
                                       id="is_admin"
                                       name="is_admin"
                                       checked={newData.is_admin || false}
                                       value={newData.is_admin || false}
                                       onChange={(e) => {
                                           setNewData({...newData, is_admin: e.target.checked})
                                       }}
                                >
                                </input>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <label>E-posta</label>
                                <input
                                    type="email"
                                    required name="email"
                                    placeholder="E-posta adresini giriniz"
                                    className={'form-control ' + (validationErrors['email'] ? 'is-invalid' : '')}
                                    value={newData.email}
                                    onChange={handleInputChange}
                                />
                                <FormFieldError errorMessage={validationErrors['email']}/>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <label htmlFor="password">Şifre</label>
                                <input
                                    type="password"
                                    className={`form-control ${validationErrors['password'] ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    placeholder="Şifre giriniz"
                                    onChange={handleInputChange}
                                />
                                <FormFieldError errorMessage={validationErrors['password']}/>
                            </div>

                            <div className="col">
                                <label htmlFor="password_confirmation">Şifrenizi tekrar giriniz</label>
                                <input
                                    type="password"
                                    className={`form-control ${validationErrors['password_confirmation'] ? 'is-invalid' : ''}`}
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Şifreyi tekrar giriniz"
                                    onChange={handleInputChange}
                                />
                                <FormFieldError errorMessage={validationErrors['password_confirmation']}/>
                            </div>
                        </div>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <CustomButton
                        text="İptal"
                        onClick={handleClose}
                        status="danger"
                    />
                    <CustomButton
                        text="Kaydet"
                        onClick={() => {
                            handleOnSubmitForm({newData, setValidationErrors})
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    )
}