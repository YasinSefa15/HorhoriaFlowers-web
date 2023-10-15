import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function RegisteredUserChart({data}) {
    return (
        <>
            <div className="col col-sm-6">
                <div className="row">
                    <div className="col d-flex justify-content-between">

                        <h5>Kayıt Olan Kullanıcılar</h5>

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
                                <XAxis dataKey="day"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1}
                                      fill="url(#colorUv)"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </>
    )
}