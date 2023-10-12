import RegisteredUserChart from "../components/Charts/RegisteredUserChart";
import {useAuth} from "../../../context/AuthContext";
import {useEffect, useState} from "react";
import {getAdminStatistics} from "../../../api.requests/admin/AdminStatisticsRequests";

export default function AdminHomePage() {
    const {secret} = useAuth()
    const [userStatistics, setUserStatistics] = useState([])

    useEffect(() => {
        getAdminStatistics({
            setUserStatistics,
            secret
        })
    }, [])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>Admin Home Page</h1>
                    <p>Bekleyen spiarişler liste</p>
                    <p>Bekleyen spiariş sayısı</p>
                    <p>Bekleyen toplam ürün sayısı</p>
                    <p>stokta olmayan ürün sayısı</p>
                    <p>stokta olmayan ürün sayısı</p>
                </div>
            </div>

            <div className="row">
                <RegisteredUserChart data={userStatistics}/>
                <RegisteredUserChart data={userStatistics}/>
            </div>
        </div>
    );
}