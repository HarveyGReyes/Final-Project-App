import React from 'react';
import '../assets/styles/components/ClassCard.scss';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classData } : any) => {
  const navigate = useNavigate()

  const handleClassSelect = () => {
  
    // Your logic here
    console.log('Button was clicked');
    // navigate to dashboard
    navigate('/home')
  };


  // console.log('classData', typeof(classData), classData)
  return (
    <button className="class-card" onClick={handleClassSelect}>
      <h3>{classData.class_name}</h3>
      <p>{classData.subject}</p>
      {/* Additional class details can go here */}
    </button>
  );
};

export default ClassCard;
