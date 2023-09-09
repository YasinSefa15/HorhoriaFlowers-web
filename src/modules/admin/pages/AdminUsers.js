import TableComponent from "../components/table/TableComponent";
import useTableState from "../components/table/TableState";
import {useEffect, useState} from "react";
import LoadingScreen from "../../user/components/LoadingScreen";
import {createAdminUser, getAdminUsers} from "../../../api.requests/admin/AdminUserRequests";
import {useAuth} from "../../../context/AuthContext";
import CustomButton from "../../user/components/CustomButton";
import AdminCreateModal from "../components/modals/AdminCreateModal";

export default function AdminUsers() {
    const tableState = useTableState();
    const [createModalShow, setCreateModalShow] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const {secret} = useAuth();

    useEffect(() => {
        tableState.setTableColumns([
            {field: "full_name", name: "Ad Soyad", checked: true},
            {field: "phone", name: "Telefon", checked: true},
            {field: "is_admin", name: "Admin", checked: true},
            {field: "created_at", name: "Kayıt Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])

        const load = async () => {
            await getAdminUsers({
                setData: tableState.setData,
                setTotalPages: tableState.setTotalPages,
                setCurrentPage: tableState.setCurrentPage,
                secret,
            })
        }

        load().then(r => {
        })

        setIsLoaded(true)
    }, []);

    const handleNewData = ({newData}) => {
        const post = async () => {
            await createAdminUser({secret, data: newData});
        }
        post().then(r => {
        })
    };

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
                        setCreateModalShow(true)
                    }}
                />
            </div>

            <TableComponent tableState={tableState}/>

            <AdminCreateModal
                showModal={createModalShow}
                setShowCreateModal={setCreateModalShow}
                handleNewData={handleNewData}
                title={"Yeni Kullanıcı Ekle"}
                fields={[
                    {field: "first_name", name: "Ad", required: true, type: "text"},
                    {field: "last_name", name: "Soyad", required: true, type: "text"},
                    {field: "phone", name: "Telefon", required: true, type: "text"},
                    {field: "is_admin", name: "Admin", required: false, type: "checkbox", checked: false},
                    {field: "email", name: "E-Posta", required: true, type: "text"},
                    {field: "password", name: "Şifre", required: true, type: "password"},
                    {field: "password_confirmation", name: "Şifre Tekrar", required: true, type: "password"},
                ]}
            />
        </>
    )
}