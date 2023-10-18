import RegisteredUserChart from "../components/Charts/RegisteredUserChart";
import {useAuth} from "../../../context/AuthContext";
import {useEffect, useState} from "react";
import {getAdminSalesStatistics, getAdminStatistics} from "../../../api.requests/admin/AdminStatisticsRequests";
import DashboardItem from "../components/deneme/DashboardItem";
import ShippingTrackerPieChart from "../components/Charts/ShippingTrackerPieChart";
import IncomeAreaChart from "../components/Charts/IncomeAreaChart";
import MostSellingProductsList from "../components/Charts/MostSellingProductsList";
import LoadingScreen from "../../user/components/LoadingScreen";
import parseDateRange from "../../../helpers/parseDateRange";
import OrderTrackChart from "../components/Charts/OrderTrackChart";

const moment = require('moment');

export default function AdminHomePage() {
    const {secret} = useAuth()
    const [userStatistics, setUserStatistics] = useState([])
    const [loading, setLoading] = useState(false)
    const [requestParams, setRequestParams] = useState({
        startDate: moment().startOf('week').toISOString(),
        endDate: moment().endOf('week').toISOString()
    })
    const [incomeStatistics, setIncomeStatistics] = useState({})
    const [userStatisticsChart, setUserStatisticsChart] = useState({})

    useEffect(() => {
        const f = async () => {
            await getAdminStatistics({
                setUserStatistics,
                secret,
                setLoading,
                setIncomeStatistics,
                setUserStatisticsChart,
                requestParams
            })
        }
        f().then()
    }, [])


    const handleDateTimeChangeForUser = (e) => {
        parseGivenDateRange({name: e.target.value})
    }

    const parseGivenDateRange = ({name}) => {
        const [startDate, endDate] = parseDateRange({name})
        setRequestParams({
            startDate,
            endDate
        })
    }

    if (!loading) {
        return (
            <LoadingScreen></LoadingScreen>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row mt-3 p-3">
                <DashboardItem
                    backgroundColor="#F8B195"
                    title="Bekleyen Spiariş Sayısı"
                    value={userStatistics.waiting_orders_count}
                />

                <DashboardItem
                    backgroundColor="#F67280"
                    title="Hazırlanması Gereken Ürün Sayısı"
                    value={userStatistics.preparing_orders_count}
                />

                <DashboardItem
                    backgroundColor="#C06C84"
                    title="Toplam Üye Sayısı"
                    value={userStatistics.total_users_count}
                />

                <DashboardItem
                    backgroundColor="#6C5B7B"
                    title="Satıştaki Ürün Sayısı"
                    value={userStatistics.total_products_count}
                />

                <DashboardItem
                    backgroundColor="#355C7D"
                    title="Stokta Olmayan Ürün Sayısı"
                    value={userStatistics.out_of_stock_products_count}
                />
            </div>

            <div className="row">
                <div className="col col-sm-7">

                    <div className="row">
                        <IncomeAreaChart
                            data={incomeStatistics}
                        />
                    </div>

                    <br></br>

                    <div className="row">
                        <OrderTrackChart
                            data={userStatistics.order_track_statistics}
                        />
                    </div>

                    <br/>

                    <div className="row">
                        <RegisteredUserChart data={userStatisticsChart}/>
                    </div>
                </div>
                <div className="col col-sm-5">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <h4>Kargoya Verilme Süreleri</h4>
                        </div>
                    </div>

                    <ShippingTrackerPieChart
                        data={userStatistics.shipping_tracker_statistics}
                    />

                    <br/>

                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <h4>En Çok Satan Ürünler</h4>
                        </div>
                    </div>

                    <MostSellingProductsList
                        data={userStatistics.most_sold_products}
                    />
                </div>
            </div>
        </div>
    );
}