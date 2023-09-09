import React, {useState} from "react";

export default function FilterComponent({options, handleFilterChange}) {
    const [showColumns, setShowColumns] = useState(false);

    return (
        <>
            <div className="dropdown spec-table-operation me-2 " onClick={() => setShowColumns(!showColumns)}
                 onMouseLeave={() => setShowColumns(false)}
                 style={{position: "relative", cursor: "pointer"}}>
                <a className="navbar-brand" role="button" data-bs-toggle="dropdown"
                   aria-expanded={showColumns}>
                    <i className="fa fa-filter me-2"></i>
                    Sırala
                </a>

                <div className={`dropdown-menu visibility-menu ${showColumns ? " show" : ""}`}
                >
                    {options.map((option) => {
                        return <option
                            key={option.name}
                            className="dropdown-item"
                            onClick={(event) => {
                                event.stopPropagation()
                                handleFilterChange({
                                    value: {
                                        orderName: option.orderName,
                                        orderDirection: option.orderDirection
                                    }
                                })
                            }}
                        >{option.name}</option>
                    })}
                </div>
            </div>
        </>
    );
}
