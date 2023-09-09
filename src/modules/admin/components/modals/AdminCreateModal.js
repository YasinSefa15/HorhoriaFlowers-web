import React from "react";
import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import CustomButton from "../../../user/components/CustomButton";
import {validateForm} from "../../../../helpers/validationHelper";

export default function AdminCreateModal({showModal, setShowCreateModal, handleNewData, title, fields}) {
    const [newData, setNewData] = useState({});
    const [errors, setErrors] = useState({});

    const handleOnClick = async ({event, data}) => {
        event.preventDefault();

        await validateForm({fields, data, setErrors});

    }

    useEffect(() => {
        if (Object.keys(newData).length === 0) {
            return;
        }

        if (Object.keys(errors).length === 0) {
            setShowCreateModal(false);
            handleNewData({newData});
            setNewData({});
        }
    }, [errors])


    const parseField = (field, index) => {
        if (field.type === "checkbox") {
            return <React.Fragment key={index}>
                <input
                    type="checkbox"
                    className={"form-check-input " + (errors[field.field] ? "is-invalid" : "")}
                    id={field.field}
                    defaultChecked={field.checked || false}
                    checked={newData[field.field] || false}
                    onChange={(e) => {
                        setNewData({...newData, [field.field]: e.target.checked});
                    }}
                />
            </React.Fragment>
        } else if (field.type === "select") {
            return <React.Fragment key={index}>
                <select onChange={(e) => {
                    setNewData({...newData, [field.field]: e.target.value});
                }}>
                    {field.options.map((option, index) => {
                        return <option value={option.value} key={index}
                                       defaultChecked={option.value === newData[field.field]}
                        >{option.text}</option>
                    })}
                </select>
            </React.Fragment>
        } else {
            return <React.Fragment key={index}>
                <input
                    type={field.type}
                    className={"form-control " + (errors[field.field] ? "is-invalid" : "")}
                    id={field.field}
                    value={newData[field.field] || ""}
                    onChange={(e) => {
                        setNewData({...newData, [field.field]: e.target.value});
                    }}
                />
            </React.Fragment>
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={() => {
                setShowCreateModal(false);
                setNewData({})
                setErrors({})
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {fields.map((field, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="row">
                                        <div className="col">{field.name}</div>
                                        <div className="col">
                                            {parseField(field, index)}
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div
                                            className="invalid-feedback d-flex justify-content-center">{errors[field.field]}</div>
                                    </div>
                                    <br/>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowCreateModal(false);
                            setNewData({});
                            setErrors({})
                        }}
                    />
                    <CustomButton
                        text="Kaydet"
                        status="success"
                        onClick={async (event) => {
                            await handleOnClick({event, data: newData});
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}