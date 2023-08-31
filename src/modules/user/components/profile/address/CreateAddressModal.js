import {Modal} from "react-bootstrap";
import CustomButton from "../../CustomButton";
import React from "react";

export default function CreateAddressModal({
                                               showModal,
                                               setShowModal,
                                               addressForm,
                                               setAddressForm,
                                               handleAddressCreate
                                           }) {
    return (
        <>
            <Modal show={showModal} onHide={() => {
                setShowModal(false)
                setAddressForm({})
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Adres Oluştur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">Adres Başlığı</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.title || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, title: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Adınız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.first_name || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, first_name: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Soyadınız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.last_name || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, last_name: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Şehir</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.city || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, city: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">İlçe</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.state || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, state: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Telefon Numaranız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={addressForm.phone || ''}
                                       onChange={(e) => {
                                           setAddressForm({...addressForm, phone: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="row">
                                <div className="col">Adres Detayı</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <textarea className="form-control " id="name" value={addressForm.description || ''}
                                              onChange={(e) => {
                                                  setAddressForm({...addressForm, description: e.target.value})
                                              }}/>
                                </div>
                            </div>
                        </div>
                        <br></br>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowModal(false)
                            setAddressForm({})
                        }}
                        status="danger"
                    >
                    </CustomButton>

                    <CustomButton
                        text="Oluştur"
                        onClick={() => {
                            setShowModal(false)
                            //setAddressForm({})
                            handleAddressCreate().then(r => {
                                setAddressForm({})
                            })
                        }}
                        status="success"
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}