import React from "react";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function ImagesField({
                                        mainImage,
                                        title,
                                        images,
                                        changeImage
                                    }) {

    return (
        <>
            <img
                src={mainImage}
                alt={title}
                className="img-fluid pb-1 w-100"
                style={{}}
            />

            <div className="small-img-group">
                <div className="small-img-col d-flex">
                    {images.map((image, index) => {
                        return (
                            <img
                                key={uuidGenerator()}
                                className="me-2"
                                src={images[index].file_path ?? " "}
                                alt={title}
                                width="100%"
                                onClick={() => {
                                    changeImage(index)
                                }}
                            />
                        );
                    })}
                </div>

            </div>

        </>
    )
}
