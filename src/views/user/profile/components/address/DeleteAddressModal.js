import {Modal} from "react-bootstrap";
import CustomButton from "../../../../../components/CustomButton";
import React from "react";

export default function DeleteAddressModal({showModal,setShowModal,handleAddressDelete}) {
    return (
        <>
            <Modal show={showModal} onHide={() => {
                setShowModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Adres Sil</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <br></br>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <i className="fa-regular fa-trash-can fa-2x"
                                ></i>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                Adresi silmek istediğinize emin misiniz?
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
                        }}
                    >
                    </CustomButton>

                    <CustomButton
                        text="Sil"
                        onClick={() => {
                            setShowModal(false)
                            //setAddressForm({})
                            handleAddressDelete().then(r => {
                            })
                        }}
                        status="danger_transparent"
                        style={{
                            border: "2px solid #f44336"
                        }}
                    >
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}