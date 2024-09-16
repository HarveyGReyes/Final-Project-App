import { BarChart, ComposedChart, 
    Legend, AreaChart, Area, Bar, Rectangle, 
    LineChart, Line, CartesianGrid, XAxis, YAxis, 
    Tooltip, ResponsiveContainer, Pie, PieChart, Cell,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    Radar } from 'recharts';

import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { IoMdReturnLeft } from "react-icons/io";
import '../assets/styles/pages/Dashboard.scss'

import { useAuth } from 'utils/AuthProvider';
import ReturnBtn from 'components/ReturnBtn';

const data = [{name: 'Student A', grade: 10},
            {name: 'Student B', grade: 50},
            {name: 'Student C', grade: 20},
            {name: 'Student D', grade: 90}];

const data2 = [{name: 'Student A', grade: 50},
    {name: 'Student B', grade: 40},
    {name: 'Student C', grade: 90},
    {name: 'Student D', grade: 70}];

const data3 = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data4 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];


const data5 = [
    {
        subject: 'Math',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Chinese',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'English',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Geography',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Physics',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'History',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];

const renderLineChart = (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <YAxis width={25}/>
        </LineChart>
    </ResponsiveContainer>
);

const renderBarChart = (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={data}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <Bar 
            dataKey="grade" 
            fill="#f1a5ad" 
            animationBegin={0}
            animationDuration={600}
            animationEasing="ease-in"
            background={false} 
        />
        </BarChart>
    </ResponsiveContainer>
)

const renderAreaChart = (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
            width={500}
            height={400}
            data={data2}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="grade" stackId="1" stroke="#8884d8" fill="#91cc8f" />
        </AreaChart>
    </ResponsiveContainer>
)

const renderVerticalComposedChart = (
    <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={data3}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" hide={true} />
            <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
    </ResponsiveContainer>
)

const renderPieChart = (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={400}>
            <Pie
                data={data4}
                cx="50%"
                cy="50%"
                labelLine={false}

                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
)

const renderRadarChart = (
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="100%" data={data5} >
            <PolarGrid />

            <PolarRadiusAxis hide={true}/>
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
)

export default function Dashboard() {
    const navigate = useNavigate()
    const { currentUser } = useAuth();

    const { classID } = useParams();

    // console.log('Dashboard', currentUser)

    function returnToClassSelection() {
        navigate('/class-selection')
    }

    function loadInsights() {
        navigate(`/insights/${classID}`)
    }

    return (
        // renderLineChart
        
        <div className='dashboard-container'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}      // Starting state
                animate={{ opacity: 1, y: 0 }}       // Animation to final state
                exit={{ opacity: 0, y: 20 }}         // Exit state
                transition={{ duration: 0.5 }}       // Duration of the animation
            >
                <ReturnBtn onReturn={returnToClassSelection}/>
                <div className='dashboard-card-container'>
                    <button className='dashboard-card' onClick={loadInsights}>
                        {renderBarChart}
                    </button>
                    <button className='dashboard-card'>
                        {renderLineChart}
                    </button>
                    <button className='dashboard-card'>
                        {renderPieChart}
                    </button>
                    <button className='dashboard-card'>
                        {renderRadarChart}
                    </button>
                    <button className='dashboard-card'>
                        {renderVerticalComposedChart}
                    </button>
                    <button className='dashboard-card'>
                        {renderAreaChart}
                    </button>
                </div>
            </motion.div>
           
            
            {/* {renderLineChart2} */}
        </div>
    )
}

