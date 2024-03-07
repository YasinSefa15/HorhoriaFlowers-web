import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {validateForm} from "../../../utils/validationHelper";
import CustomButton from "../../CustomButton";

export default function AdminUpdateModal({
                                             showUpdateModal,
                                             setShowUpdateModal,
                                             handleUpdateData,
                                             clickedData,
                                             title,
                                             fields,
                                         }) {

    const [newData, setNewData] = useState(clickedData || {});
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});


    const handleOnClick = async ({event, data}) => {
        event.preventDefault();
        await setFormData({...newData, id: clickedData.id})
        await validateForm({fields, data, setErrors});
    }


    useEffect(() => {
        if (Object.keys(newData).length === 0 || newData === clickedData) {
            return;
        }

        if (Object.keys(errors).length === 0) {
            setShowUpdateModal(false);
            handleUpdateData({newData: formData});
            setNewData({});
        }
    }, [errors])

    useEffect(() => {
        setNewData(clickedData)
        //console.log("modal use effect  clicked data", clickedData)
    }, [clickedData]);

    const parseField = (field, index) => {
        if (!clickedData) {
            return <React.Fragment key={index}></React.Fragment>
        }

        let localdata = {...newData}
        const fieldRead = newData ? (newData[field.field] ?? clickedData[field.field]) : clickedData[field.field]
        localdata = {...localdata, [field.field]: fieldRead}

        if (field.type === "checkbox") {
            return <React.Fragment key={index}>
                <input
                    type="checkbox"
                    className={"form-check-input " + (errors[field.field] ? "is-invalid" : "")}
                    id={localdata[field.field].toString()}
                    defaultChecked={localdata[field.field]}
                    onChange={(e) => {
                        setNewData({...localdata, [field.field]: e.target.checked});
                    }}
                />
            </React.Fragment>
        } else if (field.type === "select") {
            return <React.Fragment key={index}>
                <select onChange={(e) => {
                    setNewData({...localdata, [field.field]: e.target.value});
                }}>
                    {field.options.map((option, index) => {
                        return <option value={option.value} key={index}
                                       selected={option.value === localdata[field.field]}

                        >{option.text}</option>
                    })}
                </select>
            </React.Fragment>
        } else {
            return <React.Fragment key={index}>
                <input
                    type={field.type}
                    className={"form-control " + (errors[field.field] ? "is-invalid" : "")}
                    id={localdata[field.field]}
                    value={localdata[field.field]}
                    onChange={(e) => {
                        setNewData({...localdata, [field.field]: e.target.value});
                    }}
                />
            </React.Fragment>
        }
    }

    return (
        <>
            <Modal show={showUpdateModal} onHide={() => {
                setShowUpdateModal(false);
                setNewData({});
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
                            setShowUpdateModal(false);
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
