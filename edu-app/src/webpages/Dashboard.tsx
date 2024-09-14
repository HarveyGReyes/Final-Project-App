import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/pages/Dashboard.scss'

import { useAuth } from 'utils/AuthProvider';
import { IoMdReturnLeft } from "react-icons/io";

import { motion } from 'framer-motion';

const data = [{name: 'Student A', grade: 10},
            {name: 'Student B', grade: 50},
            {name: 'Student C', grade: 20},
            {name: 'Student D', grade: 90}];

const renderLineChart = (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <YAxis width={25}/>
        </LineChart>
    </ResponsiveContainer>
);

// const renderLineChart2 = (
//     <div className="graph" style={{}}>
//         <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//             <Line type="monotone" dataKey="grade" stroke="#8884d8" />
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <XAxis dataKey="name" />
//             <YAxis /> 
//             <Tooltip />
//         </LineChart>
//     </div>
// );

export default function Dashboard() {
    const navigate = useNavigate()
    const { currentUser } = useAuth();

    // console.log('Dashboard', currentUser)

    function returnToClassSelection() {
        navigate('/class-selection')
    }

    function loadInsights() {
        navigate('/insights')
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
                <div className='return-btn-container'>
                    {/* button here that  takes string fo the webpage to load */}
                    <button className="return-btn" onClick={returnToClassSelection}>
                        <IoMdReturnLeft size={40} color='#919191'/>
                    </button>
                </div>
                <div className='dashboard-card-container'>
                    <button className='dashboard-card' onClick={loadInsights}>
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
                </div>
            </motion.div>
           
            
            {/* {renderLineChart2} */}
        </div>
    )
}

