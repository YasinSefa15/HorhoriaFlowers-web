import TableComponent from "../components/table/TableComponent";
import useTableState from "../components/table/TableState";
import {useEffect} from "react";
import {getAdminOrders} from "../../../api.requests/admin/AdminOrderRequests";

export default function AdminOrders() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminOrders,
        passedOrderOptions: [
            {name: "Sipariş Durumu? (A-Z)", orderName: "order_code", orderDirection: "ASC"},
            {name: "Sipariş Durumu? (Z-A)", orderName: "order_code", orderDirection: "ASC"},
            {name: "Sipariş Kodu (A-Z)", orderName: "order_code", orderDirection: "ASC"},
            {name: "Sipariş Kodu (Z-A)", orderName: "order_code", orderDirection: "DESC"},
            {name: "Fiyat (0-9)", orderName: "price", orderDirection: "ASC"},
            {name: "Fiyat (9-0)", orderName: "price", orderDirection: "DESC"},
            {name: "En yeni oluşturulanlar", orderName: "created_at", orderDirection: "DESC"},
            {name: "En eski oluşturulanlar", orderName: "created_at", orderDirection: "ASC"},
            {name: "En yeni güncellenenler", orderName: "updated_at", orderDirection: "DESC"},
            {name: "En eski güncellenenler", orderName: "updated_at", orderDirection: "ASC"},
        ]
    })

    useEffect(() => {
        tableState.setTableColumns([
            {field: "order_code", name: "Sipariş Kodu", checked: true},
            {field: "user_name", name: "Kullanıcı Adı", checked: true},
            {field: "price", name: "Fiyat", checked: true},
            {field: "phone", name: "Telefon", checked: true},
            {field: "status", name: "Sipariş Durumu", checked: true},
            {field: "ordered_items_count", name: "Ürün Adeti", checked: true},
            {field: "created_at", name: "Veriliş Tarihi", checked: true},
            {field: "actions", name: "İşlemler", checked: true},
        ])
    }, []);

    return (
        <>

            <div className="d-flex align-items-center justify-content-between" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>
                <h1>Siparişler</h1>
            </div>

            <TableComponent tableState={tableState}/>
        </>
    )
}