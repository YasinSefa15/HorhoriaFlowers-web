import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

export default function AdminHomePage() {
    const data = [
        {name: 'Page A', uv: 200, pv: 2400, amt: 2400},
        {name: 'Page A', uv: 150, pv: 2400, amt: 2400},
        {name: 'Page A', uv: 220, pv: 2400, amt: 2400},
        {name: 'Page A', uv: 170, pv: 2400, amt: 2400}
    ];

    const renderLineChart = (
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    );

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
            <div>
                {renderLineChart}
            </div>
        </div>
    );
}