import TableComponent from "../../../components/admin/table/TableComponent";
import {useEffect, useState} from "react";
import useTableState from "../../../components/admin/table/TableState";
import {useAuth} from "../../../context/AuthContext";
import {
    createAdminCategory, deleteAdminCategory,
    getAdminCategories,
    getAdminCategoriesMapped, updateAdminCategory
} from "../../../requests/admin/AdminCategoryRequests";
import CustomButton from "../../../components/CustomButton";
import AdminCreateModal from "../../../components/admin/modals/AdminCreateModal";
import LoadingScreen from "../../../components/LoadingScreen";
import AdminUpdateModal from "../../../components/admin/modals/AdminUpdateModal";
import AdminDeleteModal from "../../../components/admin/modals/AdminDeleteModal";
import CreateModal from "./modals/CreateModal";
import UpdateModal from "./modals/UpdateModal";

export default function AdminCategories() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminCategories,
        passedOrderOptions: [
            {name: "En yeni oluşturulanlar", orderName: "created_at", orderDirection: "desc"},
            {name: "En eski oluşturulanlar", orderName: "created_at", orderDirection: "asc"},
            {name: "En yeni güncellenenler", orderName: "updated_at", orderDirection: "desc"},
            {name: "En eski güncellenenler", orderName: "updated_at", orderDirection: "asc"},
            {name: "Başlık (A-Z)", orderName: "title", orderDirection: "asc"},
            {name: "Başlık (Z-A)", orderName: "title", orderDirection: "desc"},
        ]
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoriesMapped, setCategoriesMapped] = useState([]);
    const {secret} = useAuth();

    const handleNewData = ({newData, setValidationErrors}) => {
        const post = async () => {
            await createAdminCategory({
                secret,
                newData,
                setValidationErrors
            });
            setIsLoaded(true)
        }
        post().then(r => {
        })
    };

    const handleUpdateData = ({newData,setValidationErrors}) => {
        const update = async () => {
            await updateAdminCategory({
                secret,
                data: newData,
                setData: tableState.setData,
                newData,
                slug: tableState.clickedData.slug,
                setValidationErrors
            });
            setIsLoaded(true)
        }
        update().then(r => {
        })
    }

    useEffect(() => {
        tableState.setTableColumns([
            {field: "title", name: "Başlık", checked: true},
            {field: "parent_name", name: "Üst Kategori", checked: true},
            {field: "products_count", name: "Ürün Sayısı", checked: true},
            {field: "created_at", name: "Oluşturulma Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        tableState.setIsActionUpdateSet(true)
        tableState.setIsActionDeleteSet(true)

        const load = async () => {
            await getAdminCategoriesMapped({setCategoriesMapped, secret})
        }

        load().then(r => [])

        setIsLoaded(true)
    }, []);


    const handleDeleteData = () => {
        const deleteCategory = async () => {
            await deleteAdminCategory({
                secret,
                data: tableState.data,
                setData: tableState.setData,
                category: tableState.clickedData
            });
            setIsLoaded(true)
        }
        deleteCategory().then(r => {
        })
    }

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

            <TableComponent tableState={tableState}/>

            <CreateModal
                showModal={tableState.showCreateModal}
                setShowModal={tableState.setShowCreateModal}
                handleSubmit={handleNewData}
                categoriesMapped={categoriesMapped}
            />

            <UpdateModal
                showModal={tableState.showUpdateModal}
                setShowModal={tableState.setShowUpdateModal}
                handleSubmit={handleUpdateData}
                categoriesMapped={categoriesMapped}
                selectedCategory={tableState.clickedData}
            />

            <AdminDeleteModal
                showModal={tableState.showDeleteModal}
                setShowModal={tableState.setShowDeleteModal}
                handleDeleteData={handleDeleteData}
                title="Kategoriyi Sil"
                message={tableState.clickedData?.title + " isimli kategoriyi silmek istediğinize emin misiniz?\nKategoriye bağlı alt kategoriler ve ürünlerde silinecektir.Bu işlem geri alınamaz!"}
            />
        </>
    )
}