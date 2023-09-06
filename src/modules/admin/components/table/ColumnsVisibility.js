import React from "react";

export default function ColumnsVisibility({
                                            setShowColumns,
                                            showColumns,
                                            tableColumns,
                                            handleCheckboxChange
                                          }) {
  return (
    <>
      <div className="dropdown spec-table-operation" onClick={() => setShowColumns(true)}
           onMouseLeave={() => setShowColumns(false)}
           style={{ position: "relative", cursor: "pointer" }}>
        <a className="navbar-brand" role="button" data-bs-toggle="dropdown"
           aria-expanded={showColumns}>
          <i className="bi bi-layout-three-columns me-2"></i>
          Satırlar
        </a>

        <div className={`dropdown-menu visibility-menu ${showColumns ? " show" : ""}`}
        >
          {Object.keys(tableColumns).map((columnName, index) => {
            if (tableColumns[columnName].field === "İşlemler") {
              return <div className="d-flex visibility-item">
                <span>
                <input type="checkbox"
                       checked={true}
                       disabled
                       className="dropdown-item " value={tableColumns[columnName].field}
                       name={tableColumns[columnName].field} id={tableColumns[columnName].field}
                ></input>
                </span>
                <span>

                <label>{tableColumns[columnName].field}</label>
                </span>
              </div>;
            }
            return <div className="d-flex visibility-item" key={tableColumns[columnName].field}>
              <span>
              <input type="checkbox"
                     defaultChecked={tableColumns[columnName].checked}
                     className="dropdown-item" value={tableColumns[columnName].field}
                     name={tableColumns[columnName].field} id={tableColumns[columnName].field}
                     onChange={() => handleCheckboxChange(columnName)}
              ></input>
              </span>
              <span>
              <label>{tableColumns[columnName].field}</label>
              </span>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}
