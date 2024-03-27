import React, {useRef, useState} from "react";
import SmallTableButton from "./SmallTableButton";
import "./TableComponent.css";
import ColumnsVisibility from "./ColumnsVisibility";
import SearchComponent from "./SearchComponent";
import FilterComponent from "./FilterComponent";
import CustomButton from "../../CustomButton";

export default function TableComponent({
                                           tableState
                                       }) {
    const [showColumns, setShowColumns] = useState(false);
    const showableColumnNames = useRef([]);

    showableColumnNames.current = [];
    return (
        <>
            <div className="container spec-table">
                <div className="row spec-table-operations">
                    <div className="col d-flex justify-content-end">
                        <SearchComponent
                            handleSearchChange={tableState.handleSearchChange}
                        />
                        <FilterComponent
                            options={tableState.orderOptions}
                            handleFilterChange={tableState.handleFilterChange}
                        />

                        <ColumnsVisibility
                            setShowColumns={setShowColumns}
                            showColumns={showColumns}
                            tableColumns={tableState.tableColumns}
                            handleCheckboxChange={tableState.handleCheckboxChange}
                        />
                    </div>
                </div>

                <div className="row spec-table-header">

                    {Object.keys(tableState.tableColumns).map((columnName, index) => {
                        if (tableState.tableColumns[columnName].checked) {
                            showableColumnNames.current.push(tableState.tableColumns[columnName].field);
                            if (tableState.tableColumns[columnName].field === "actions") {
                                return (
                                    <div className="col col-sm-1 spec-table-header-title"
                                         key={tableState.tableColumns[columnName].field}>
                                        {tableState.tableColumns[columnName].name}
                                    </div>
                                );
                            }
                            return (
                                <div className="col spec-table-header-title"
                                     key={tableState.tableColumns[columnName].field}
                                >
                                    {tableState.tableColumns[columnName].name}
                                </div>
                            );
                        }
                    })}
                </div>
                {tableState.data.map((item) => {
                        return <div
                            className="row spec-table-row"
                            key={item.id + "a"}
                            onClick={() => {
                                tableState.setClickedData(item);
                            }}
                        >
                            {Object.keys(showableColumnNames.current).map((showable) => {
                                if (showableColumnNames.current[showable] === "actions") {
                                    return <div className="col col-sm-1"
                                                key={"a" + (showableColumnNames.current[showable]) + "b"}>
                                        <div>
                                            <SmallTableButton
                                                viewAction={tableState.isActionViewSet && tableState.setShowViewModal}
                                                updateAction={tableState.isActionUpdateSet && tableState.setShowUpdateModal}
                                                deleteAction={tableState.isActionDeleteSet && tableState.setShowDeleteModal}
                                            />
                                        </div>
                                    </div>;
                                }
                                if (item[showableColumnNames.current[showable]] === true) {
                                    return <div
                                        className="col"
                                        key={"a" + (showableColumnNames.current[showable]) + "b"}
                                    >
                                        <i className="fa-solid fa-circle-check" style={{color: "#14730f"}}></i>
                                    </div>
                                } else if (item[showableColumnNames.current[showable]] === false) {
                                    return <div className="col" key={"a" + (showableColumnNames.current[showable]) + "b"}>
                                        <i className="fa-solid fa-circle-xmark" style={{color: "#93131a"}}></i>
                                    </div>
                                } else if (showableColumnNames.current[showable] === "file_path") {
                                    return <div className="col" key={"a" + (showableColumnNames.current[showable]) + "b"}>
                                        <img src={item[showableColumnNames.current[showable]]}
                                             alt={item[showableColumnNames.current[showable]]}
                                             style={{
                                                 width: "50px",
                                                 height: "50px",
                                                 cursor: tableState.isClickable ? "pointer" : "default"
                                             }}
                                             onClick={() => {
                                                 tableState.isClickable && tableState.setIsClickActionTriggered(true)
                                             }}
                                        />
                                    </div>
                                }

                                return <div className="col"
                                            style={{
                                                overflow: "hidden",   // Metni sığdırmak için taşan kısmı gizle
                                                textOverflow: "ellipsis",  // Taşan metni "..." ile göster
                                                whiteSpace: "nowrap",  // Metni tek satırda tut
                                                cursor: tableState.isClickable ? "pointer" : "default"
                                            }}
                                            key={"a" + (showableColumnNames.current[showable]) + "b"}
                                            onClick={() => {
                                                tableState.isClickable && tableState.setIsClickActionTriggered(true)
                                            }}
                                >{item[showableColumnNames.current[showable]]}
                                </div>;
                            })}
                        </div>;
                    }
                )}
                <div className="row">
                    <div className="col d-flex justify-content-between spec-nav-area">
                        <CustomButton
                            text="Önceki"
                            style={{width: "10%"}}
                            onClick={() => {
                                tableState.handlePageChange({value: -1})
                            }}
                        ></CustomButton>
                        <span>{tableState.totalPages} Sayfadan {tableState.currentPage}. Görüntüleniyor</span>
                        <CustomButton
                            text="Sonraki"
                            style={{width: "10%"}}
                            onClick={() => {
                                tableState.handlePageChange({value: 1})
                            }}
                        ></CustomButton>
                    </div>
                </div>
            </div>
        </>
    );
}
