import React, {useEffect, useState} from "react";

export default function ProductImagesFieldComp({selectedFiles, setSelectedFiles}) {
    const [nonDeletedFilesLength, setNonDeletedFilesLength] = useState(0);
    const handleImageRemove = (givenFileOrder) => {
        let localForm = [...selectedFiles];

        let clickedData = selectedFiles.find(file => file.order === givenFileOrder && file.is_deleted === undefined);
        clickedData.is_deleted = true;

        //after comes that index records, order must be updated
        localForm.map((file, index) => {
            if (file.order >= givenFileOrder && file.is_deleted === undefined) {
                file.order--;
            }
            return file;
        })

        setSelectedFiles(localForm);
    }

    const handleImageOrder = (fileOrder, direction) => {
        //direction -1, 1, fileOrder 2nd img
        let localForm = [...selectedFiles];
        let clickedData = selectedFiles.find(file => file.order === fileOrder && file.is_deleted === undefined);
        let replaceData = selectedFiles.find(file => file.order === fileOrder + direction && file.is_deleted === undefined);

        localForm = localForm.map(file => {
            if (file.order === fileOrder && file.is_deleted === undefined) {
                //if replace data is File
                if (replaceData.id === undefined) {
                    const copyOfReplaceData = new File([replaceData], replaceData.name, {type: replaceData.type});
                    copyOfReplaceData.order = fileOrder;
                    return copyOfReplaceData;
                } else { //if replace data is object
                    return {...replaceData, order: fileOrder}
                }
            } else if (file.order === fileOrder + direction && file.is_deleted === undefined) {
                if (clickedData.id === undefined) {
                    const copyOfClickedData = new File([clickedData], clickedData.name, {type: clickedData.type});
                    copyOfClickedData.order = fileOrder + direction;
                    return copyOfClickedData;
                } else {
                    return {...clickedData, order: fileOrder + direction}
                }
            }
            return file;
        })
        setSelectedFiles(localForm);
    }

    useEffect(() => {
        setNonDeletedFilesLength(selectedFiles.filter(file => file.is_deleted === undefined).length)
    }, [selectedFiles]);


    return (
        <>
            {nonDeletedFilesLength > 0 && (
                <div className="row">
                    Seçilen Dosyalar:
                    <div className="row">
                        {selectedFiles.map((file) => {
                            if (file.is_deleted === true) {
                                return null;
                            }
                            return (
                                <div style={{position: 'relative', width: 'min-content'}}>
                                    {/* İleri ve Geri İkonları */}
                                    <i className="fa-solid fa-trash"
                                       onClick={() => handleImageRemove(file.order)}
                                       style={{
                                           position: 'absolute',
                                           color: '#b43c3c',
                                           top: 0,
                                           left: '12px',
                                           width: '30px',
                                           height: '30px',
                                           zIndex: 1,
                                           cursor: 'pointer',
                                           // Diğer stillendirmeler
                                       }}
                                    ></i>

                                    {file.order > 0 && (
                                        <i className="fa-solid fa-arrow-left"
                                           onClick={() => handleImageOrder(file.order, -1)}
                                           style={{
                                               position: 'absolute',
                                               top: 0,
                                               right: file.order < nonDeletedFilesLength - 1 ? '30px' : 0,
                                               width: '30px',
                                               height: '30px',
                                               zIndex: 1,
                                               cursor: 'pointer',
                                               // Diğer stillendirmeler
                                           }}
                                        ></i>
                                    )}
                                    {file.order < nonDeletedFilesLength - 1 && (
                                        <i className="fa-solid fa-arrow-right"
                                           onClick={() => handleImageOrder(file.order, +1)}
                                           style={{
                                               position: 'absolute',
                                               top: 0,
                                               right: 0,
                                               width: '30px',
                                               height: '30px',
                                               zIndex: 1,
                                               cursor: 'pointer',
                                               // Diğer stillendirmeler
                                           }}></i>
                                    )}

                                    <img
                                        className="default-img mb-2 mt-4"
                                        src={file.file_path ?? URL.createObjectURL((file))}
                                        alt={file.name}
                                        style={{
                                            width: "165px",
                                            height: "248px",
                                            border: file.order === 0 ? '2px solid #000' : 'none',
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}