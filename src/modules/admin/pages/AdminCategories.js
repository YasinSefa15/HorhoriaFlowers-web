import TableComponent from "../components/table/TableComponent";
import {useEffect, useState} from "react";
import useTableState from "../components/table/TableState";
import {useAuth} from "../../../context/AuthContext";
import {createAdminCategory, getAdminCategories} from "../../../api.requests/admin/AdminCategoryRequests";
import CustomButton from "../../user/components/CustomButton";
import AdminCreateModal from "../components/modals/AdminCreateModal";

export default function AdminCategories() {
    const tableState = useTableState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [clickedData, setClickedData] = useState([]);
    const {secret} = useAuth();

    const handleNewData = ({newData}) => {
        const post = async () => {
            await createAdminCategory({secret, data: newData});
        }
        post().then(r => {
        })
    };


    useEffect(() => {
        tableState.setTableColumns([
            {field: "title", name: "Başlık", checked: true},
            {field: "slug", name: "Slug", checked: true},
            {field: "parent_id", name: "Ana Kategori", checked: true},
            {field: "created_at", name: "Oluşturulma Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        const load = async () => {
            await getAdminCategories({
                setData: tableState.setData,
                setTotalPages: tableState.setTotalPages,
                setCurrentPage: tableState.setCurrentPage,
                secret,
            })
        }

        load().then(r => [])

        setIsLoaded(true)
    }, []);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>
                <h1>Kategoriler</h1>
                <CustomButton
                    text="Yeni Kategori Ekle"
                    status="success"
                    style={{
                        padding: "5px 15px",
                        width: "max-content",
                    }}
                    onClick={() => {
                        setCreateModalShow(true)
                    }}
                />
            </div>

            <TableComponent
                tableState={tableState}
            >
            </TableComponent>

            <AdminCreateModal
                showModal={createModalShow}
                setShowCreateModal={setCreateModalShow}
                handleNewData={handleNewData}
                title={"Yeni Kategori Ekle"}
                fields={[
                    {field: "title", name: "Başlık", required: true, type: "text"},
                    {
                        field: "parent_id",
                        name: "Üst Kategori",
                        required: false,
                        type: "select",
                        options: [
                            {value: 0, text: "Üst Kategori Yok"},
                            ...tableState.data.map((item) => {
                                return {value: item.id, text: item.title}
                            })
                        ]
                    },
                ]}
            />
        </>
    )
}