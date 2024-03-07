import TableComponent from "../../../components/admin/table/TableComponent";
import useTableState from "../../../components/admin/table/TableState";
import {useEffect, useState} from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import {
    createAdminUser,
    deleteAdminUser,
    getAdminUsers,
    updateAdminUser
} from "../../../requests/admin/AdminUserRequests";
import {useAuth} from "../../../context/AuthContext";
import CustomButton from "../../../components/CustomButton";
import AdminUpdateModal from "../../../components/admin/modals/AdminUpdateModal";
import AdminDeleteModal from "../../../components/admin/modals/AdminDeleteModal";
import CreateUserModal from "./modals/CreateUserModal";
import UpdateUserModal from "./modals/UpdateUserModal";

export default function AdminUsers() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminUsers,
        passedOrderOptions: [
            {name: "En yeni oluşturulanlar", orderName: "created_at", orderDirection: "DESC"},
            {name: "En eski oluşturulanlar", orderName: "created_at", orderDirection: "ASC"},
            {name: "En yeni güncellenenler", orderName: "updated_at", orderDirection: "DESC"},
            {name: "En eski güncellenenler", orderName: "updated_at", orderDirection: "ASC"},
            {name: "Ad (A-Z)", orderName: "first_name", orderDirection: "ASC"},
            {name: "Ad (Z-A)", orderName: "first_name", orderDirection: "DESC"},
            {name: "Telefon (A-Z)", orderName: "phone", orderDirection: "ASC"},
            {name: "Telefon (Z-A)", orderName: "phone", orderDirection: "DESC"},
        ]
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const {secret} = useAuth();


    useEffect(() => {
        tableState.setTableColumns([
            {field: "full_name", name: "Ad Soyad", checked: true},
            {field: "phone", name: "Telefon", checked: true},
            {field: "email", name: "Emmil", checked: true},
            {field: "is_admin", name: "Admin", checked: true},
            {field: "created_at", name: "Kayıt Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        tableState.setIsActionUpdateSet(true)
        tableState.setIsActionDeleteSet(true)

        setIsLoaded(true)
    }, []);


    const handleNewData = ({newData, setValidationErrors}) => {
        const post = async () => {
            await createAdminUser({secret, newData, setValidationErrors});
        }
        post().then(r => {
        })
    };

    const handleUpdateData = ({newData,setValidationErrors}) => {
        const put = async () => {
            await updateAdminUser({
                secret,
                data: newData,
                pageData: tableState.data,
                setPageData: tableState.setData,
                setValidationErrors
            });
        }
        put().then(r => {
        })
    }

    const handleDeleteData = () => {
        const put = async () => {
            await deleteAdminUser({
                secret,
                userId: tableState.clickedData.id,
                pageData: tableState.data,
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
                <h1>Kayıtlı Kullanıcılar</h1>
                <CustomButton
                    text="Yeni Kullanıcı Ekle"
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


            <CreateUserModal
                showModal={tableState.showCreateModal}
                setShowModal={tableState.setShowCreateModal}
                handleSubmit={handleNewData}
            />

            <UpdateUserModal
                showModal={tableState.showUpdateModal}
                setShowModal={tableState.setShowUpdateModal}
                handleSubmit={handleUpdateData}
                selectedUser={tableState.clickedData}
            />

            {
                /*

            <AdminUpdateModal
                showUpdateModal={tableState.showUpdateModal}
                setShowUpdateModal={tableState.setShowUpdateModal}
                handleUpdateData={handleUpdateData}
                clickedData={tableState.clickedData}
                title={"Kullanıcıyı Düzenle"}
                fields={[
                    {field: "first_name", name: "Ad", required: false, type: "text"},
                    {field: "last_name", name: "Soyad", required: false, type: "text"},
                    {field: "phone", name: "Telefon", required: false, type: "text"},
                    {field: "is_admin", name: "Admin", required: false, type: "checkbox", checked: false},
                    {field: "email", name: "E-Posta", required: false, type: "text"},
                    {field: "password", name: "Şifre", required: false, type: "password"},
                    {field: "password_confirmation", name: "Şifre Tekrar", required: false, type: "password"},
                ]}
            />


                 */
            }
            <AdminDeleteModal
                showModal={tableState.showDeleteModal}
                setShowModal={tableState.setShowDeleteModal}
                handleDeleteData={handleDeleteData}
                title="Kullanıcıyı Sil"
                message={tableState.clickedData?.full_name + " isimli kullanıcıyı silmek istediğinize emin misiniz?" +
                    "\nKullanıcıya ait tüm bilgiler silinecektir." +
                    "\nBu işlem geri alınamaz!"}
            />
        </>
    )
}