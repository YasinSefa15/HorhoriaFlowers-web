import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function RegisteredUserChart() {
    const data = [
        {date: 200, xx: 2400, amt: 2400},
        {date: 150, xx: 2400, amt: 2400},
        {date: 220, xx: 2400, amt: 2400},
        {date: 170, xx: 2400, amt: 2400}
    ];

    return (
        <>
            <div className="col col-sm-4">
                <div className="row">
                    <div className="col d-flex justify-content-between">

                        <h4>Kayıt Olan Kullanıcılar</h4>

                        <select>
                            <option>
                                2021
                            </option>
                            <option>
                                2020
                            </option>
                        </select>

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={data}
                                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="date" stroke="#8884d8" fillOpacity={1}
                                      fill="url(#colorUv)"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </>
    )
}