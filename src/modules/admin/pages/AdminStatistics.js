import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import {getAdminStatistics} from "../../../api.requests/admin/AdminStatisticsRequests";
import {useAuth} from "../../../context/AuthContext";

export default function AdminStatistics() {
    const {secret} = useAuth()
    const [userStatistics, setUserStatistics] = useState([])

    useEffect(() => {
        getAdminStatistics({
            setUserStatistics,
            secret
        })
    }, [])

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{
                padding: "0 25px",
                marginTop: "25px",
            }}>
                <h1>İstatistikler</h1>
            </div>
            <p>en çok sepete eklenen ürünler</p>
            <p>sepette en çok adet olarak yer alan ürünler</p>
            <p>en çok tercih edilen ürünler</p>
            <p>en çok adet olarak tercih edilen ürünler</p>

            <div className="container">
                <AreaChart width={730} height={250} data={userStatistics}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                </AreaChart>
            </div>
        </>
    )
}