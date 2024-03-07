import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import AdminProductSizesComp from "../components/AdminProductSizesComp";
import AdminMultipleImageUpload from "../../../../components/admin/AdminMultipleImageUpload";
import FormFieldError from "../../../../utils/FormFieldError";
import CustomButton from "../../../../components/CustomButton";
import LoadingScreen from "../../../../components/LoadingScreen";

//todo görsel güncelleme doğru değil gibi

export default function AdminProductUpdateModal({
                                                    showUpdateModal,
                                                    setShowUpdateModal,
                                                    handleUpdateData,
                                                    clickedData,
                                                    categoriesMapped,
                                                    detailData
                                                }) {
    const [newData, setNewData] = useState({...clickedData});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});


    //functions returns changed images like, new images, deleted images, order changed images
    const parseUpdatedImages = (data) => {
        const newImages = data.new_images;
        let updatedImages = [];
        let uploadedFiles = [];
        let deletedImages = [];

        newImages.forEach((image, index) => {
            //files in the database
            if (image.id !== undefined) {
                //if order is changed and is_deleted is undefined
                if (image.order !== data.images.find((file) => file.id === image.id).order && image.is_deleted === undefined) {
                    updatedImages.push(image)
                } else if (image.is_deleted === true) {
                    //if file is deleted
                    deletedImages.push(image)
                }
            } else if (image.is_deleted === undefined) { //id is undefined and is_deleted is undefined
                //file in format of {order: 0, file: File}
                //uploaded files are the files that are not in the database
                uploadedFiles.push(image)
            }
        })
        return {
            new_images: uploadedFiles,
            updated_images: updatedImages,
            deleted_images: deletedImages
        };
    }

    const parseUpdatedSizes = (data) => {
        const groupSizes = data.sizes //group sizes are the sizes that are already in the database
        const newSizes = data.new_sizes; //new sizes are the sizes that are added by the user
        let updatedSizes = [];
        let deletedSizes = [];
        let addedSizes = [];

        newSizes.forEach((size, index) => {
            if (size.id !== undefined) {
                if (size.is_deleted === true) {
                    deletedSizes.push(size)
                } else if (size.is_deleted === undefined) {
                    const groundSize = groupSizes.find((groupSize) => groupSize.id === size.id)
                    if (size.value !== groundSize.value || size.quantity !== groundSize.quantity) {
                        //giving old_quantity and quantity values to the updated sizes
                        updatedSizes.push({...size, old_value: groundSize.value, old_quantity: groundSize.quantity})
                    }
                }
            } else if (size.is_deleted === undefined) {
                addedSizes.push(size)
            }
        })

        return {
            new_sizes: addedSizes,
            updated_sizes: updatedSizes,
            deleted_sizes: deletedSizes
        }
    }

    const handleOnClick = async ({event, data}) => {
        event.preventDefault();
        const images = parseUpdatedImages(data);
        const sizes = parseUpdatedSizes(data);

        handleUpdateData({newData: {...newData, images, sizes}, setValidationErrors})
    }


    useEffect(() => {
        setNewData({...clickedData})
    }, [clickedData]);

    useEffect(() => {
        const localForm = [];

        selectedFiles.forEach((file, index) => {
            localForm.push(file);
        });

        setNewData({...newData, new_images: localForm});
    }, [selectedFiles]);

    useEffect(() => {
        if (detailData.isLoaded) {
            setNewData({
                ...newData,
                images: detailData?.images || [],
                sizes: detailData?.sizes ? [...detailData?.sizes.map((size) => {
                    return {...size}
                })] : [],
                new_sizes: detailData?.sizes ? [...detailData?.sizes] : [],
                description: detailData?.description || '',
            })
            setSelectedFiles(detailData?.images || [])
        }
    }, [detailData.isLoaded]);

    useEffect(() => {
        if (Object.keys(newData).length === 0 || newData === clickedData) {
            return;
        }

        if (Object.keys(validationErrors).length === 0) {
            setShowUpdateModal(false);
            //setNewData({});
        }
    }, [validationErrors])

    return (
        <>
            <Modal show={showUpdateModal} onHide={() => {
                setShowUpdateModal(false);
                setValidationErrors({})
            }}
                   className={"modal-lg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ürün Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!detailData.isLoaded ? (<LoadingScreen></LoadingScreen>) :
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="col-sm-3">Ürün Adı</div>
                                    <div className="">
                                        <input type="text"
                                               className={"form-control " + (validationErrors.title ? "is-invalid" : "")}
                                               id="name" value={newData?.title || ''}
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
                                                <option value={category.id}
                                                        selected={category.id === newData?.category_id}
                                                >{category.title}</option>
                                            ))}
                                        </select>
                                        <FormFieldError errorMessage={validationErrors.category_id}/>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <div className="row">
                                <div className="col">
                                    <div className="">Eski Fiyat</div>
                                    <div className="">
                                        <input type="text"
                                               className={"form-control " + (validationErrors.old_price ? "is-invalid" : "")}
                                               id="name" value={newData?.old_price || ''}
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
                                        <input type="text"
                                               className={"form-control " + (validationErrors.new_price ? "is-invalid" : "")}
                                               id="name" value={newData?.new_price || ''}
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
                                        <input type="number" className="form-control" id="discount_product"
                                               value={(((newData?.old_price - newData?.new_price) / newData?.old_price) * 100).toFixed(2) || 0}
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

                            <br/>

                            <div className="row">
                                <div className="col">
                                    <div className="col-sm-3">Açıklama</div>
                                    <div className="">
                            <textarea className={"form-control " + (validationErrors.description ? "is-invalid" : "")}
                                      id="name"
                                      value={newData?.description || ''}
                                      onChange={(e) => {
                                          setNewData({...newData, description: e.target.value})
                                      }}
                            />
                                        <FormFieldError errorMessage={validationErrors.description}/>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <AdminProductSizesComp
                                validationErrors={validationErrors}
                                newData={newData}
                                setNewData={setNewData}
                            />

                            <br/>

                            <AdminMultipleImageUpload
                                validationErrors={validationErrors}
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                            />

                        </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        text="Kapat"
                        onClick={() => {
                            setShowUpdateModal(false);
                            setValidationErrors({})
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
