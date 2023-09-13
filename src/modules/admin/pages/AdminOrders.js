import TableComponent from "../components/table/TableComponent";
import useTableState from "../components/table/TableState";
import {useEffect} from "react";
import {getAdminOrders} from "../../../api.requests/admin/AdminOrderRequests";

export default function AdminOrders() {
    const tableState = useTableState({
        loadDataQueryWithParams: getAdminOrders,
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
    })

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
    }, []);

    return (
        <>
            <h1>Orders</h1>

            <TableComponent
            tableState={tableState}
            ></TableComponent>
        </>
    )
}