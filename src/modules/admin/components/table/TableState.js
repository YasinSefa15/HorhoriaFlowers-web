import {useEffect, useState} from 'react';
import {getAdminCategories} from "../../../../api.requests/admin/AdminCategoryRequests";
import {useAuth} from "../../../../context/AuthContext";

function useTableState({loadDataQueryWithParams, passedOrderOptions}) {
    const [data, setData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isActionViewSet, setIsActionViewSet] = useState(false);
    const [isActionUpdateSet, setIsActionUpdateSet] = useState(false);
    const [isActionDeleteSet, setIsActionDeleteSet] = useState(false);
    const [clickedData, setClickedData] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [requestedPage, setRequestedPage] = useState(1);
    const [tableColumns, setTableColumns] = useState([]);
    const [search, setSearch] = useState("");//{limit: 10, page: 1, search: "", onStock: 0, orderBy: null}
    const [requestParams, setRequestParams] = useState({});//{limit: 10, page: 1, search: "", onStock: 0, orderBy: null}
    const [orderOptions, setOrderOptions] = useState(passedOrderOptions ?? []);// {name: "Ad (A-Z)",orderName: "first_name", orderDirection: "ASC"},
    const {secret} = useAuth();

    useEffect(() => {
        if (requestParams.page === undefined) {
            return;
        }
        console.log("tableState.requestParams", requestParams)
        const load = async () => {
            await loadDataQueryWithParams({
                setData: setData,
                setTotalPages: setTotalPages,
                setCurrentPage: setCurrentPage,
                requestParams: requestParams,
                secret,
            })
        }

        load().then(r => [])
    }, [requestParams]);


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

    const handleSearchChange = ({searchText}) => {
        //console.log("handleSearchChange", searchText)
        setRequestedPage(1)
        if (searchText === "") {
            setSearch("")
            setRequestParams({...requestParams, search: "", page: 1})
            return;
        }
        setSearch(searchText)
        setRequestParams({...requestParams, search: searchText, page: 1})
    }

    const handleFilterChange = ({value}) => {
        //value has orderName and orderDirection
        console.log("handleFilterChange", value)
        setRequestedPage(1)
        setRequestParams({...requestParams, orderName: value.orderName, orderDirection: value.orderDirection, page: 1,})
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
        isActionDeleteSet,
        isActionViewSet,
        isActionUpdateSet,
        setIsActionViewSet,
        setIsActionUpdateSet,
        setIsActionDeleteSet,
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
        handleSearchChange,
        handleFilterChange,
        orderOptions,
        setOrderOptions,
        requestParams,
        setRequestParams,
        tableColumns,
        setTableColumns,
        handleCheckboxChange,
    };
}

export default useTableState;
