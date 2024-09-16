import React from 'react';
import '../assets/styles/components/ClassCard.scss';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classID, classData } : any) => {

  const navigate = useNavigate()

  const handleClassSelect = () => {
    navigate(`/home/${classID}`)
  };

  return (
    <button className="class-card" onClick={handleClassSelect}>
      <h3>{classData.class_name}</h3>
      <p>{classData.subject}</p>
      {/* Additional class details can go here */}
    </button>
  );
};

export default ClassCard;
