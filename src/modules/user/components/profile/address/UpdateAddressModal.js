import {Modal} from "react-bootstrap";
import CustomButton from "../../CustomButton";
import React from "react";

export default function UpdateAddressModal({
                                               updateShowModal,
                                               setUpdateShowModal,
                                               updateAddressForm,
                                               setUpdateAddressForm,
                                               handleAddressUpdate
                                           }) {
    return (
        <>
            <Modal show={updateShowModal} onHide={() => {
                setUpdateShowModal(false)
                setUpdateAddressForm({})
            }}
                   onShow={() => {
                       setUpdateAddressForm({...updateAddressForm, id: updateAddressForm.id || ''})
                       console.log("update form opened", updateAddressForm)
                   }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adres Güncelle</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">Adres Başlığı</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.title || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, title: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Adınız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.first_name || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, first_name: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Soyadınız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.last_name || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, last_name: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Şehir</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.city || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, city: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">İlçe</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.state || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, state: e.target.value})
                                       }}/>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col">Telefon Numaranız</div>
                            <div className="col">
                                <input type="text" className="form-control " id="name"
                                       value={updateAddressForm.phone || ''}
                                       onChange={(e) => {
                                           setUpdateAddressForm({...updateAddressForm, phone: e.target.value})
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
                                    <textarea className="form-control " id="name"
                                              value={updateAddressForm.description || ''}
                                              onChange={(e) => {
                                                  setUpdateAddressForm({
                                                      ...updateAddressForm,
                                                      description: e.target.value
                                                  })
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
                            setUpdateShowModal(false)
                            setUpdateAddressForm({})
                        }}
                        status="danger"
                    >
                    </CustomButton>

                    <CustomButton
                        text="Güncelle"
                        onClick={() => {
                            setUpdateShowModal(false)
                            //serUpdateAddressForm({})
                            handleAddressUpdate().then(r => {
                            })
                        }}
                        status="success"
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}