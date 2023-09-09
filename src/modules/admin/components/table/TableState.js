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
    const [requestedPage, setRequestedPage] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
    const [requestParams, setRequestParams] = useState({});//{limit: 10, page: 1, title: "", onStock: 0, orderBy: null}

    const handleCheckboxChange = (columnName) => {
        setTableColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.field === columnName
                    ? {...column, checked: !column.checked}
                    : column
            )
        );
    };

    const handlePageChange = ({value}) => {
        let requestedPageCopy = requestedPage
        if (requestedPageCopy === null) {
            requestedPageCopy = 1
        }
        if (requestedPageCopy + value === 0 || requestedPageCopy + value === totalPages + 1) {
            return;
        }
        setRequestedPage(requestedPageCopy + value)
        setRequestParams({...requestParams, page: requestedPageCopy + value})
    }

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
        requestedPage,
        setRequestedPage,
        handlePageChange,
        requestParams,
        setRequestParams,
        tableColumns,
        setTableColumns,
        handleCheckboxChange,
    };
}

export default useTableState;
