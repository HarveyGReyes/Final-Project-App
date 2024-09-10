import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../assets/styles/pages/Dashboard.scss'

import { useAuth } from 'utils/AuthProvider';

// const { currentUser } = useAuth();
// const navigate = useNavigate()

const data = [{name: 'Student A', grade: 10},
            {name: 'Student B', grade: 50},
            {name: 'Student C', grade: 20},
            {name: 'Student D', grade: 90}];

const renderLineChart = (
    <div className="graph" style={{}}>
        <LineChart width={200} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {/* <XAxis dataKey="name" />
            <YAxis /> */}
            {/* <Tooltip /> */}
        </LineChart>
    </div>
);

const renderLineChart2 = (
    <div className="graph" style={{}}>
        <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis /> 
            <Tooltip />
        </LineChart>
    </div>
);



export default function Dashboard() {

    const { currentUser } = useAuth();
    console.log('Dashboard', currentUser)

    return (
        // renderLineChart
        <div className='dashboard-cointainer'>
            <button className='dashboard-card'>
                {renderLineChart}
            </button>
            <button className='dashboard-card'>

            </button>
            <button className='dashboard-card'>

            </button>
            <button className='dashboard-card'>

            </button>
            <button className='dashboard-card'>

            </button>
            <button className='dashboard-card'>

            </button>
            {renderLineChart2}
        </div>
    )
}

