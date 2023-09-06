import React, { useRef, useState } from "react";
import SmallTableButton from "../SmallTableButton";
import "./TableComponent.css";
import ColumnsVisibility from "./ColumnsVisibility";
import SearchComponent from "./SearchComponent";
import FilterComponent from "./FilterComponent";

// eslint-disable-next-line react/prop-types
export default function TableComponent({
                                         data,
                                         updateAction,
                                         viewAction,
                                         deleteAction,
                                         setClickedData,
                                         tableColumns,
                                         handleCheckboxChange
                                       }) {
  const [showColumns, setShowColumns] = useState(false);
  const showableColumnNames = useRef([]);

  showableColumnNames.current = [];
  return (
    <>
      <div className="container spec-table">
        <div className="row spec-table-operations">
          <div className="col d-flex justify-content-end">
            <SearchComponent />

            <FilterComponent></FilterComponent>

            <ColumnsVisibility
              setShowColumns={setShowColumns}
              showColumns={showColumns}
              tableColumns={tableColumns}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="row spec-table-header">

          {Object.keys(tableColumns).map((columnName, index) => {
            if (tableColumns[columnName].checked) {
              showableColumnNames.current.push(columnName);
              if (tableColumns[columnName].field === "İşlemler") {
                return (
                  <div className="col col-sm-1 spec-table-header-title" key={tableColumns[columnName].field}>
                    {tableColumns[columnName].field}
                  </div>
                );
              }
              return (
                <div className="col spec-table-header-title" key={tableColumns[columnName].field}>
                  {tableColumns[columnName].field}
                </div>
              );
            }
          })}
        </div>
        {data.map((item) => {
            return <div
              className="row spec-table-row"
              key={(item.id || item.uuid)}
              onClick={() => {
                setClickedData(item);
              }}
            >
              {Object.keys(showableColumnNames.current).map((showable, x) => {
                if (showableColumnNames.current[showable] === "actions") {
                  return <div className="col col-sm-1">
                    <div>
                      <SmallTableButton
                        viewAction={viewAction}
                        updateAction={updateAction}
                        deleteAction={deleteAction}
                      />
                    </div>
                  </div>;
                }
                return <div className="col">{item[showableColumnNames.current[showable]]}</div>;
              })}
            </div>;
          }
        )}
        <div className="row">
          <div className="col d-flex justify-content-between spec-nav-area">
            <button>
              Önceki
            </button>
            <span>20 Sayfadan 2. Görüntüleniyor</span>
            <button>
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
