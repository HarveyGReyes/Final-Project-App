import React,  { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from 'utils/AuthProvider';
import ClassCard from 'components/ClassCard';
import { Class } from 'types/types';

import '../assets/styles/pages/ClassSelectionPage.scss'

export default function ClassSelectionPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

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
        console.log(response)
        setClasses(response.data.classes)
  
        // return response.data;
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
        {classes.map((classItem) => (
            <ClassCard key={classItem.class_id} classData={classItem} />
        ))}
      </div>


      <div>
        {/* <bSutton onClick={goToLogin}>Default Button</button> */}
      </div>

    </div>
  );
}