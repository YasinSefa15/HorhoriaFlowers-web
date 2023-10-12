import React from "react";
import {Modal} from "react-bootstrap";
import CustomButton from "../../../user/components/CustomButton";

export default function AdminDeleteModal({
                                        showModal,
                                        setShowModal,
                                        handleDeleteData,
                                        title,
                                        message
                                    }) {

    return (
        <>
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <br></br>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <i className="fa-solid fa-trash fa-3x"
                                style={{
                                    color: "#f44336"
                                }}></i>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col d-flex justify-content-center text-center">
                                <h4>{message}</h4>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    />

                    <CustomButton
                        text="Sil"
                        status="danger"
                        onClick={() => {
                            setShowModal(false);
                            handleDeleteData()
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}