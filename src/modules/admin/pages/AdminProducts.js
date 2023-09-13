import useTableState from "../components/table/TableState";
import {createAdminUser, getAdminUsers, updateAdminUser} from "../../../api.requests/admin/AdminUserRequests";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import LoadingScreen from "../../user/components/LoadingScreen";
import CustomButton from "../../user/components/CustomButton";
import TableComponent from "../components/table/TableComponent";
import AdminCreateModal from "../components/modals/AdminCreateModal";
import {getAdminCategoriesMapped, getAdminProducts} from "../../../api.requests/admin/AdminProductRequests";
import {useNavigate} from "react-router-dom";

export default function AdminProducts() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminProducts,
        passedOrderOptions: [
            {name: "Başlık (A-Z)", orderName: "title", orderDirection: "ASC"},
            {name: "Başlık (Z-A)", orderName: "title", orderDirection: "DESC"},
            {name: "Eski Fiyat (0-9)", orderName: "old_price", orderDirection: "ASC"},
            {name: "Eski Fiyat (9-0)", orderName: "old_price", orderDirection: "DESC"},
            {name: "Yeni Fiyat (9-0)", orderName: "new_price", orderDirection: "ASC"},
            {name: "Yeni Fiyat (9-0)", orderName: "new_price", orderDirection: "DESC"},
            {name: "En yeni oluşturulanlar", orderName: "created_at", orderDirection: "DESC"},
            {name: "En eski oluşturulanlar", orderName: "created_at", orderDirection: "ASC"},
            {name: "En yeni güncellenenler", orderName: "updated_at", orderDirection: "DESC"},
            {name: "En eski güncellenenler", orderName: "updated_at", orderDirection: "ASC"},
        ]
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate()
    const {secret} = useAuth();


    useEffect(() => {
        tableState.setTableColumns([
            {field: "file_path", name: "İçerik", checked: true},
            {field: "title", name: "Başlık", checked: true},
            {field: "slug", name: "Slug", checked: true},
            {field: "category_name", name: "Kategori", checked: true},
            {field: "old_price", name: "Eski Fiyat", checked: true},
            {field: "new_price", name: "Yeni Fiyat", checked: true},
            {field: "total_quantity", name: "Toplam Stok", checked: true},
            {field: "created_at", name: "Kayıt Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        setIsLoaded(true)
    }, []);

    useEffect(() => {
        console.log("use effect 2", tableState.showCreateModal)
        if (tableState.showCreateModal === true) {
            navigate("/admin/products/create")
        }
        return() => {
            tableState.setShowCreateModal(false)
        }
    }, [tableState.showCreateModal])



    useEffect(() => {
        console.log("use effect", tableState.clickedData)
    }, [tableState.clickedData]);

    const handleUpdateData = ({newData}) => {
        const put = async () => {
            console.log("FORM DATA : ", newData)
            await updateAdminUser({
                secret, data: newData, pageData: tableState.data,
                setPageData: tableState.setData
            });
        }
        put().then(r => {
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
        </>
    )
}