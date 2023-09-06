import TableComponent from "../components/table/TableComponent";
import {useState} from "react";

export default function AdminCategories() {
    const [data, setData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clickedData, setClickedData] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [tableColumns, setTableColumns] = useState([
        'fullName',
        'phone',
        'createdAt',
        'actions'
    ]);

    const handleCheckboxChange = (columnName) => {
        console.log("handleCheckboxChange", columnName);
        setTableColumns(prevColumns => ({
            ...prevColumns,
            [columnName]: {
                ...prevColumns[columnName],
                checked: !prevColumns[columnName].checked
            }
        }));
    };

    return (
        <>
            <h1>adminProfile</h1>

            <TableComponent
                data={data}
                itemFields={["fullName", "phone", "createdAt"]}
                tableHeader={["İsim", "Telefon", "Kayıt Tarihi", "İşlemler"]}
                tableColumns={tableColumns}
                updateAction={setShowUpdateModal}
                viewAction={setShowViewModal}
                deleteAction={setShowDeleteModal}
                setClickedData={setClickedData}
                handleCheckboxChange={handleCheckboxChange}
            >
            </TableComponent>
        </>
    )
}