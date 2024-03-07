import React, {PureComponent, useState} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {useAuth} from "../../../context/AuthContext";
import parseDateRange from "../../../utils/parseDateRange";
import {getAdminSalesStatistics} from "../../../requests/admin/AdminStatisticsRequests";

export default function IncomeAreaChart({data}) {
    const [incomeStatistics, setIncomeStatistics] = useState(data)
    const {secret} = useAuth()

    const handleDateTimeChangeForSale = (e) => {
        const [startDate, endDate] = parseDateRange({name: e.target.value})
        const fetchSalesStatistics = async () => {
            await getAdminSalesStatistics({
                setIncomeStatistics,
                secret,
                requestParams:{
                    startDate,
                    endDate
                }
            })
        }
        fetchSalesStatistics().then()
    }

    return (
        <>
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <h4>Gelir İstatistiği</h4>

                    <select onChange={
                        (e) => {
                            console.log(e.target.value)
                            handleDateTimeChangeForSale(e)
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

        <ResponsiveContainer width="100%" height={270}>
            <AreaChart
                width={500}
                height={400}
                data={incomeStatistics}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="day"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8"/>
            </AreaChart>
        </ResponsiveContainer>
        </>
    );
}
