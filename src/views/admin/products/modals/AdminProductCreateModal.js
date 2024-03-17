import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import AdminMultipleImageUpload from "../../../../components/admin/AdminMultipleImageUpload";
import FormFieldError from "../../../../utils/FormFieldError";
import CustomButton from "../../../../components/CustomButton";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function AdminProductCreateModal({
                                                    showModal,
                                                    setShowModal,
                                                    handleCreateData,
                                                    clickedData,
                                                    categoriesMapped,
                                                }) {
    const [newData, setNewData] = useState({...clickedData});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const handleOnClick = async ({event, newData}) => {
        event.preventDefault();
        await handleCreateData({newData: {...newData, images: selectedFiles}, setValidationErrors});
    }


    useEffect(() => {
        if (Object.keys(newData).length === 0 || newData === clickedData) {
            return;
        }

        if (Object.keys(validationErrors).length === 0) {
            setShowModal(false);
            setSelectedFiles([])
            setNewData({});
        }
    }, [validationErrors])

    return (
        <>
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setSelectedFiles([])
                setValidationErrors({})
            }}
                   className={"modal-lg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ürün Oluştur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <div className="col-sm-3">Ürün Adı</div>
                                <div className="">
                                    <input type="text"
                                           className={"form-control " + (validationErrors.title ? "is-invalid" : "")}
                                           id="name" value={newData.title || ''}
                                           placeholder="Ürün adı"
                                           onChange={(e) => {
                                               setNewData({...newData, title: e.target.value})
                                           }}
                                    />
                                    <FormFieldError errorMessage={validationErrors.title}/>
                                </div>
                            </div>

                            <div className="col">
                                <div className="col-sm-3">Kategori</div>
                                <div className="">
                                    <select
                                        className={"form-control " + (validationErrors.category_id ? "is-invalid" : "")}
                                        onChange={(e) => {
                                            setNewData({...newData, category_id: e.target.value})
                                        }}
                                    >
                                        <option value={-1}>Kategori Seç</option>
                                        {categoriesMapped.map((category, index) => (
                                            <option key={uuidGenerator()} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                    <FormFieldError errorMessage={validationErrors.category_id}/>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col">
                                <div className="">Eski Fiyat</div>
                                <div className="">
                                    <input type="number"
                                           placeholder="Eski Fiyat"
                                           className={"form-control " + (validationErrors.old_price ? "is-invalid" : "")}
                                           id="name" value={newData.old_price || ''}
                                           onChange={(e) => {
                                               setNewData({...newData, old_price: e.target.value})
                                           }}
                                    />
                                    <FormFieldError errorMessage={validationErrors.old_price}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="">Yeni Fiyat</div>
                                <div className="">
                                    <input type="number"
                                           placeholder="Yeni Fiyat"
                                           className={"form-control " + (validationErrors.new_price ? "is-invalid" : "")}
                                           id="name" value={newData.new_price || ''}
                                           onChange={(e) => {
                                               setNewData({...newData, new_price: e.target.value})
                                           }}
                                    />
                                    <FormFieldError errorMessage={validationErrors.new_price}/>
                                </div>
                            </div>

                            <div className="col">
                                <div className="">İndirim Oranı</div>
                                <div className="">
                                    <input type="number" className="form-control" id="name"
                                           placeholder="İndirim Oranı"
                                           value={(((newData.old_price - newData.new_price) / newData.old_price) * 100).toFixed(2) || 0}
                                           onChange={(e) => {
                                               const percent = e.target.value
                                               setNewData({
                                                   ...newData,
                                                   new_price: newData.old_price - (newData.old_price * percent / 100)
                                               })
                                           }}
                                    />
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col">
                                <div className="col-sm-3">Açıklama</div>
                                <div className="">
                            <textarea className={"form-control " + (validationErrors.description ? "is-invalid" : "")}
                                      id="description"
                                      placeholder="Ürüne dair bilgileri giriniz"
                                      value={newData.description || ''}
                                      onChange={(e) => {
                                          setNewData({...newData, description: e.target.value})
                                      }}
                            />
                                    <FormFieldError errorMessage={validationErrors.description}/>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div
                            className={"row " + (validationErrors.sizes ? "border p-1 rounded border-danger" : "")}>
                            <div className="col">
                                <div className="d-flex justify-content-between mb-2">
                                    Bedenler
                                    <CustomButton
                                        text={"Beden Ekle"}
                                        style={{width: "10%"}}
                                        onClick={() => {
                                            let sizesForm = newData.sizes || []
                                            sizesForm.push({
                                                value: "",
                                                quantity: 0
                                            })
                                            setNewData({...newData, sizes: sizesForm})
                                        }}
                                    />
                                </div>
                                <div className="bg-body-secondary p-3">
                                    {newData.sizes && newData.sizes.map((size, index) => (
                                        <>
                                            <div className="prod-sizes-list d-flex justify-content-between">
                                                <div>
                                                    <input type="text" className="form-control w-50"
                                                           value={size.value}
                                                           onChange={(e) => {
                                                               let sizesForm = newData.sizes || []
                                                               sizesForm[index].value = e.target.value
                                                               setNewData({...newData, sizes: sizesForm})
                                                           }}
                                                    />
                                                    <FormFieldError
                                                        errorMessage={validationErrors["sizes." + index + ".value"]}/>
                                                </div>

                                                <div>
                                                    <div className="d-flex align-items-center">
                                                        <input type="text" className="form-control w-25 me-2"
                                                               value={size.quantity}
                                                               onChange={(e) => {
                                                                   let sizesForm = newData.sizes || []
                                                                   sizesForm[index].quantity = e.target.value
                                                                   setNewData({...newData, sizes: sizesForm})
                                                               }}
                                                        />
                                                        Adet
                                                    </div>
                                                    <FormFieldError
                                                        errorMessage={validationErrors["sizes." + index + ".quantity"]}/>
                                                </div>

                                                <CustomButton
                                                    text="Çıkart"
                                                    style={{width: "min-content", padding: "0 8px"}}
                                                    onClick={() => {
                                                        let sizesForm = newData.sizes || []
                                                        sizesForm.splice(index, 1)
                                                        setNewData({...newData, sizes: sizesForm})
                                                    }}></CustomButton>
                                            </div>
                                            {index !== newData.sizes.length - 1 && (
                                                <hr></hr>
                                            )}
                                        </>
                                    ))}
                                </div>
                                <FormFieldError errorMessage={validationErrors.sizes}/>
                            </div>
                        </div>

                        <br></br>

                        <AdminMultipleImageUpload
                            validationErrors={validationErrors}
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />

                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowModal(false);
                            setSelectedFiles([])
                            setValidationErrors({})
                        }}
                    />
                    <CustomButton
                        text="Kaydet"
                        status="success"
                        onClick={async (event) => {
                            await handleOnClick({event, newData});
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    )
}