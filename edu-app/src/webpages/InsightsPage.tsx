import { motion } from "framer-motion";
import { IoMdReturnLeft } from "react-icons/io";

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

export default function InsightsPage() {
    const navigate = useNavigate();

    function returnToDashboard() {
        navigate('/home')
    }

    return (
        <div className="insights-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}      // Starting state
            animate={{ opacity: 1, y: 0 }}       // Animation to final state
            exit={{ opacity: 0, y: 20 }}         // Exit state
            transition={{ duration: 0.5 }}       // Duration of the animation
          >
            <div className='return-btn-container'>
                {/* button here that  takes string fo the webpage to load */}
                <button className="return-btn" onClick={returnToDashboard}>
                    <IoMdReturnLeft size={40} color='#919191'/>
                </button>
            </div>
            <div className='insights-chart-container'>
              
            </div>
            <div className='insights-facets-container'>
              
            </div>
          </motion.div>
        </div>
      );
}