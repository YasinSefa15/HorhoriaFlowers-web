import {Form, Modal} from "react-bootstrap";
import CustomButton from "../../../../components/CustomButton";
import FormFieldError from "../../../../utils/FormFieldError";
import {useEffect, useRef, useState} from "react";

export default function UpdateModal({
                                        selectedCategory,
                                        showModal,
                                        setShowModal,
                                        handleSubmit,
                                        categoriesMapped
                                    }) {
    const [validationErrors, setValidationErrors] = useState({});
    const originalData = useRef()
    const [newData, setNewData] = useState({});

    useEffect(() => {
        if (Object.keys(validationErrors).length === 0) {
            setShowModal(false);
            setNewData({...selectedCategory})
            originalData.current = {...selectedCategory}
        }
    }, [validationErrors])

    useEffect(() => {
        setNewData({...selectedCategory})
        originalData.current = {...selectedCategory}
    }, [selectedCategory]);

    const handleClose = () => {
        setShowModal(false);
        setNewData({...originalData.current})
        setValidationErrors({})
    }

    const handleOnClick = () => {
        if (JSON.stringify(originalData.current) !== JSON.stringify(newData)) {
            const form = {}
            form.parent_id = newData.parent_id === "Üst Kategori Seçiniz" ? null : newData.parent_id;
            form.title = newData.title;

            handleSubmit({newData: form, setValidationErrors})
        } else {
            handleClose()
        }
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
                <Modal.Title>Kategori Güncelle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Başlık</Form.Label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={newData.title}
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
                            value={newData.parent_id === null ? "Üst Kategori Seçiniz" : newData.parent_id}
                            className={`form-select ${validationErrors['parent_id'] ? 'is-invalid' : ''}`}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="Üst Kategori Seçiniz">Üst Kategori Seçiniz</option>
                            {categoriesMapped.map((category, index) => {
                                return <option
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
                    onClick={handleOnClick}
                />
            </Modal.Footer>
        </Modal>
    )
        ;
}