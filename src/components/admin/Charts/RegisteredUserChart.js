import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import parseDateRange from "../../../utils/parseDateRange";
import {getAdminUsersStatistics} from "../../../requests/admin/AdminStatisticsRequests";

export default function RegisteredUserChart({data}) {
    const [userStatistics, setUserStatistics] = useState(data)
    const {secret} = useAuth()

    const handleDateTimeChangeForUser = (e) => {
        const [startDate, endDate] = parseDateRange({name: e.target.value})
        const fetchSalesStatistics = async () => {
            await getAdminUsersStatistics({
                setUserStatistics,
                secret,
                requestParams: {
                    startDate,
                    endDate
                }
            })
        }
        fetchSalesStatistics().then()
    }

    return (
        <>
            <div className="col">
                <div className="row">
                    <div className="col d-flex justify-content-between">

                        <h5>Kayıt Olan Kullanıcılar</h5>

                        <select onChange={
                            (e) => {
                                console.log(e.target.value)
                                handleDateTimeChangeForUser(e)
                            }
                        }>
                            <option value="this_week">
                                Bu Hafta
                            </option>
                            <option value="this_month">
                                Bu Ay
                            </option>
                            <option value="last_month">
                                Geçen Ay
                            </option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={userStatistics}
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
                                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1}
                                      fill="url(#colorUv)"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </>
    )
}