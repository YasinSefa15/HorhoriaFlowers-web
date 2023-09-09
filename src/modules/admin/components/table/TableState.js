import {useState} from 'react';

function useTableState() {
    const [data, setData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clickedData, setClickedData] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tableColumns, setTableColumns] = useState([]);

    const handleCheckboxChange = (columnName) => {
        setTableColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.field === columnName
                    ? {...column, checked: !column.checked}
                    : column
            )
        );
    };

    return {
        data,
        setData,
        showCreateModal,
        setShowCreateModal,
        showUpdateModal,
        setShowUpdateModal,
        showDeleteModal,
        setShowDeleteModal,
        clickedData,
        setClickedData,
        showViewModal,
        setShowViewModal,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        tableColumns,
        setTableColumns,
        handleCheckboxChange,
    };
}

export default useTableState;
