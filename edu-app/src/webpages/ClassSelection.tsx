import React,  { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from 'utils/AuthProvider';
import ClassCard from 'components/ClassCard';
import { Class } from 'types/types';

import { motion } from 'framer-motion';

import '../assets/styles/pages/ClassSelectionPage.scss'

export default function ClassSelectionPage() {
  const { currentUser } = useAuth();
  
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const loadUserClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/load_classes',
        {
          params: {
              employee_id: currentUser?.employee_id
          }
        });
        setClasses(response.data.classes)

      } catch (error) {
          console.error('Failed to fetch classes:', error);
      }
    };

    loadUserClasses()
  }, []);

  return (
    <div className="class-selection-container">
      {/* <h1>SELECT CLASS</h1> */}
      
      <div className="class-list">
        <motion.div
            initial={{ opacity: 0, y: 20 }}      // Starting state
            animate={{ opacity: 1, y: 0 }}       // Animation to final state
            exit={{ opacity: 0, y: 20 }}         // Exit state
            transition={{ duration: 0.5 }}       // Duration of the animation
        >
          {classes.map((classItem) => (
              <ClassCard classID={classItem.class_id} classData={classItem} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}