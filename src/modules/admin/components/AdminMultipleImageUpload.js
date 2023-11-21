import FormFieldError from "../../global/components/FormFieldError";
import ProductImagesFieldComp from "./ProductImagesFieldComp";
import React from "react";

export default function AdminMultipleImageUpload({validationErrors, selectedFiles, setSelectedFiles}) {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const filesOrderedAdded = []
        //each file in files add order property
        const notDeletedFilesLength = selectedFiles.filter((file) => file.is_deleted !== true).length;

        files.forEach((file, index) => {
            filesOrderedAdded.push({
                order: notDeletedFilesLength + index,
                file: file
            });
        });

        setSelectedFiles([...selectedFiles, ...filesOrderedAdded]);
    };
    return (
        <div className="row">
            <div className="col">
                <div className="col-sm-3">Ürün Görselleri</div>
                <div className="">
                    <input
                        className={"form-control " + (validationErrors.images ? "is-invalid" : "")}
                        type="file"
                        multiple
                        onChange={handleFileChange}/>
                    <FormFieldError errorMessage={validationErrors.images}/>
                </div>
            </div>

            <div className="row">
                <ProductImagesFieldComp
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                ></ProductImagesFieldComp>
            <FormFieldError errorMessage={validationErrors['images.new_images']}/>
            <FormFieldError errorMessage={validationErrors['images.updated_images']}/>
            <FormFieldError errorMessage={validationErrors['images.deleted_images']}/>
            </div>

        </div>
    )
}