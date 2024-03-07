import {Form, Modal} from "react-bootstrap";
import CustomButton from "../../../../components/CustomButton";
import {useEffect, useState} from "react";
import FormFieldError from "../../../../utils/FormFieldError";

export default function CreateModal({showModal, setShowModal, categoriesMapped, handleSubmit}) {
    const [validationErrors, setValidationErrors] = useState({});
    const [newData, setNewData] = useState({});

    useEffect(() => {
        if (Object.keys(validationErrors).length === 0) {
            setShowModal(false);
        }
    }, [validationErrors]);


    const handleClose = () => {
        setShowModal(false);
    }

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Kategori Ekle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Başlık</Form.Label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className={`form-control ${validationErrors['title'] ? 'is-invalid' : ''}`}
                            placeholder="Kategori Başlığını Giriniz"
                            onChange={(e) => handleChange(e)}
                        />
                        <FormFieldError errorMessage={validationErrors['title']}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Üst Kategori</Form.Label>
                        <select
                            name="parent_id"
                            defaultValue={"Üst Kategori Seçiniz"}
                            className={`form-select ${validationErrors['parent_id'] ? 'is-invalid' : ''}`}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="Üst Kategori Seçiniz">Üst Kategori Seçiniz</option>
                            {categoriesMapped.map((category, index) => {
                                return <option
                                    defaultValue={category.id === newData.parent_id ? "selected" : ""}
                                    key={index} value={category.id}>{category.title}</option>
                            })}
                        </select>
                        <FormFieldError errorMessage={validationErrors['parent_id']}/>
                    </Form.Group>
                </Form>
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
                        const parent_id = newData.parent_id === "Üst Kategori Seçiniz" ? null : newData.parent_id;
                        handleSubmit({newData: {...newData, parent_id}, setValidationErrors})
                    }}
                />
            </Modal.Footer>
        </Modal>
    );
}