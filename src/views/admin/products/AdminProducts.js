import useTableState from "../../../components/admin/table/TableState";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import LoadingScreen from "../../../components/LoadingScreen";
import CustomButton from "../../../components/CustomButton";
import TableComponent from "../../../components/admin/table/TableComponent";
import {
    createAdminProduct,
    deleteAdminProduct, getAdminCategoriesMapped, getAdminProductDetail,
    getAdminProducts,
    updateAdminProduct
} from "../../../requests/admin/AdminProductRequests";
import AdminProductCreateModal from "./modals/AdminProductCreateModal";
import AdminDeleteModal from "../../../components/admin/modals/AdminDeleteModal";
import AdminProductUpdateModal from "./modals/AdminProductUpdateModal";

export default function AdminProducts() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminProducts,
        passedOrderOptions: [
            {name: "Başlık (A-Z)", orderName: "title", orderDirection: "ASC"},
            {name: "Başlık (Z-A)", orderName: "title", orderDirection: "DESC"},
            {name: "Eski Fiyat (0-9)", orderName: "old_price", orderDirection: "ASC"},
            {name: "Eski Fiyat (9-0)", orderName: "old_price", orderDirection: "DESC"},
            {name: "Yeni Fiyat (0-9)", orderName: "new_price", orderDirection: "ASC"},
            {name: "Yeni Fiyat (9-0)", orderName: "new_price", orderDirection: "DESC"},
            {name: "En yeni oluşturulanlar", orderName: "created_at", orderDirection: "DESC"},
            {name: "En eski oluşturulanlar", orderName: "created_at", orderDirection: "ASC"},
            {name: "En yeni güncellenenler", orderName: "updated_at", orderDirection: "DESC"},
            {name: "En eski güncellenenler", orderName: "updated_at", orderDirection: "ASC"},
        ]
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoriesMapped, setCategoriesMapped] = useState([]);
    const [detailData, setDetailData] = useState({
        isLoaded: false,
    })
    const {secret} = useAuth();


    useEffect(() => {
        tableState.setTableColumns([
            {field: "file_path", name: "İçerik", checked: true},
            {field: "title", name: "Başlık", checked: true},
            {field: "category_name", name: "Kategori", checked: true},
            {field: "old_price", name: "Eski Fiyat", checked: true},
            {field: "new_price", name: "Yeni Fiyat", checked: true},
            {field: "total_quantity", name: "Toplam Stok", checked: true},
            {field: "created_at", name: "Kayıt Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        getAdminCategoriesMapped({setCategoriesMapped, secret}).then(r => {
        })

        tableState.setIsActionDeleteSet(true)
        tableState.setIsActionUpdateSet(true)
        //tableState.setIsActionViewSet(true)

        setIsLoaded(true)
    }, []);


    useEffect(() => {
        if (tableState.showUpdateModal === true) {
            const loadDetail = async () => {
                await getAdminProductDetail({product_id: tableState.clickedData?.id, setData: setDetailData, secret})
            }
            loadDetail().then(r => {
            })
        } else if (detailData.isLoaded === true) {
            setDetailData({isLoaded: false})
        }
    }, [tableState.showUpdateModal]);

    const handleCreateData = ({newData, setValidationErrors}) => {
        const post = async () => {
            await createAdminProduct({
                secret,
                newData,
                setValidationErrors
            });
        }
        post().then(r => {
        })
    }


    const handleUpdateData = ({newData, setValidationErrors}) => {
        const put = async () => {
            await updateAdminProduct({
                secret,
                newData,
                setValidationErrors
            });
        }
        put().then(r => {
        })
    }

    const handleDeleteData = () => {
        const deleteProduct = async () => {
            await deleteAdminProduct({
                secret,
                data: tableState.data,
                setData: tableState.setData,
                product: tableState.clickedData
            });
            setIsLoaded(true)
        }
        deleteProduct().then(r => {
        })
    }

    if (!isLoaded) {
        return <LoadingScreen></LoadingScreen>
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>
                <h1>Ürünler</h1>
                <CustomButton
                    text="Yeni Ürün Ekle"
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

            <AdminProductCreateModal
                showModal={tableState.showCreateModal}
                setShowModal={tableState.setShowCreateModal}
                categoriesMapped={categoriesMapped}
                clickedData={tableState.clickedData}
                handleCreateData={handleCreateData}
            />

            <AdminDeleteModal
                showModal={tableState.showDeleteModal}
                setShowModal={tableState.setShowDeleteModal}
                handleDeleteData={handleDeleteData}
                title={"Ürün Sil"}
                message={tableState.clickedData?.title + " ürününü silmek istediğinize emin misiniz?" +
                    "\nBu işlem geri alınamaz."}
            />

            <AdminProductUpdateModal
                showUpdateModal={tableState.showUpdateModal}
                setShowUpdateModal={tableState.setShowUpdateModal}
                handleUpdateData={handleUpdateData}
                clickedData={tableState.clickedData}
                categoriesMapped={categoriesMapped}
                detailData={detailData}
            />
        </>
    )
}