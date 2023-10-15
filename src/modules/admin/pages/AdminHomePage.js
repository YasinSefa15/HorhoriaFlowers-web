import RegisteredUserChart from "../components/Charts/RegisteredUserChart";
import {useAuth} from "../../../context/AuthContext";
import {useEffect, useState} from "react";
import {getAdminStatistics} from "../../../api.requests/admin/AdminStatisticsRequests";
import DashboardItem from "../components/deneme/DashboardItem";
import shippingTrackerPieChart from "../components/Charts/ShippingTrackerPieChart";
import ShippingTrackerPieChart from "../components/Charts/ShippingTrackerPieChart";
import IncomeAreaChart from "../components/Charts/IncomeAreaChart";
import MostSellingProductsList from "../components/Charts/MostSellingProductsList";

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
            <div className="row mt-3 p-3">
                <DashboardItem
                    backgroundColor="#F8B195"
                    title="Bekleyen Spiariş Sayısı"
                    value="10"
                />

                <DashboardItem
                    backgroundColor="#F67280"
                    title="Hazırlanması Gereken Ürün Sayısı"
                    value="10"
                />

                <DashboardItem
                    backgroundColor="#C06C84"
                    title="Toplam Üye Sayısı"
                    value="10"
                />

                <DashboardItem
                    backgroundColor="#6C5B7B"
                    title="Satıştaki Ürün Sayısı"
                    value="10"
                />

                <DashboardItem
                    backgroundColor="#355C7D"
                    title="Stokta Olmayan Ürün Sayısı"
                    value="10"
                />
            </div>

            <div className="row">
                <div className="col col-sm-7">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <h4>Satış İstatistiği</h4>

                            <select>
                                <option>
                                    Bu Hafta
                                </option>
                                <option>
                                    2020
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <IncomeAreaChart/>
                    </div>

                    <br></br>

                    <div className="row">
                        <RegisteredUserChart data={userStatistics}/>
                        <RegisteredUserChart data={userStatistics}/>
                    </div>
                </div>
                <div className="col col-sm-5">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <h4>Kargoya Verilme Süreleri</h4>
                        </div>
                    </div>

                    <ShippingTrackerPieChart/>

                    <br/>

                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <h4>En Çok Satan Ürünler</h4>
                        </div>
                    </div>

                    <MostSellingProductsList/>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div className="row">
                <RegisteredUserChart data={userStatistics}/>
                <RegisteredUserChart data={userStatistics}/>
            </div>
        </div>
    );
}