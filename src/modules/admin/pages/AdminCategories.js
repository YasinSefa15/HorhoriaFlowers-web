import TableComponent from "../components/table/TableComponent";
import {useEffect, useState} from "react";
import useTableState from "../components/table/TableState";
import {useAuth} from "../../../context/AuthContext";
import {
    createAdminCategory,
    getAdminCategories,
    getAdminCategoriesMapped
} from "../../../api.requests/admin/AdminCategoryRequests";
import CustomButton from "../../user/components/CustomButton";
import AdminCreateModal from "../components/modals/AdminCreateModal";
import LoadingScreen from "../../user/components/LoadingScreen";

export default function AdminCategories() {
    const tableState = useTableState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoriesMapped, setCategoriesMapped] = useState([]);
    const {secret} = useAuth();

    const handleNewData = ({newData}) => {
        const post = async () => {
            await createAdminCategory({secret, data: newData});
            setIsLoaded(true)
        }
        post().then(r => {
        })
    };


    useEffect(() => {
        tableState.setTableColumns([
            {field: "title", name: "Başlık", checked: true},
            {field: "slug", name: "Slug", checked: true},
            {field: "parent_name", name: "Üst Kategori", checked: true},
            {field: "created_at", name: "Oluşturulma Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        const load = async () => {
            await getAdminCategories({
                setData: tableState.setData,
                setTotalPages: tableState.setTotalPages,
                setCurrentPage: tableState.setCurrentPage,
                requestParams: tableState.requestParams,
                secret,
            })
            await getAdminCategoriesMapped({setCategoriesMapped, secret})
        }

        load().then(r => [])

        setIsLoaded(true)
    }, []);

    useEffect(() => {
        if (tableState.requestedPage === null) {
            return;
        }
        console.log("requestParams", tableState.requestParams)
        const load = async () => {
            await getAdminCategories({
                setData: tableState.setData,
                setTotalPages: tableState.setTotalPages,
                setCurrentPage: tableState.setCurrentPage,
                requestParams: tableState.requestParams,
                secret,
            })
        }

        load().then(r => [])
    }, [tableState.requestParams]);

    if (!isLoaded) {
        return <LoadingScreen/>
    }

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
                        tableState.setShowCreateModal(true)
                    }}
                />
            </div>

            <TableComponent
                tableState={tableState}
            >
            </TableComponent>

            <AdminCreateModal
                showModal={tableState.showCreateModal}
                setShowCreateModal={tableState.setShowCreateModal}
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
                            ...categoriesMapped.map((item) => {
                                return {value: item.id, text: item.title}
                            })
                        ]
                    },
                ]}
            />
        </>
    )
}