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
                            <div className=" justify-content-center text-center">
                                {message.split('\n').map((line, index) => {
                                    if (index === 0) {
                                        return <h5 key={index}>{line}</h5>
                                    }
                                    return <p key={index}>{line}</p>
                                })}
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