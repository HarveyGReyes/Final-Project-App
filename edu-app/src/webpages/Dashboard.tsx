import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [{name: 'Student A', grade: 10},
            {name: 'Student B', grade: 50},
            {name: 'Student C', grade: 20},
            {name: 'Student D', grade: 90}];

const renderLineChart = (
    <div className="graph" style={{ marginTop: '100px' }}>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    </div>
);

export default function Dashboard() {
    return (
        renderLineChart
    )
}

