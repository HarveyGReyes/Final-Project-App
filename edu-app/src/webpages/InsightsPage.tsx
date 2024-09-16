import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";

import ReturnBtn from 'components/ReturnBtn';
import { RenderBarChart, RenderLineChart } from 'components/Charts';

import { Facet, FacetSelection, Student, Assignment } from 'types/types';
import FacetsMenu from 'components/Facets';

import { useAuth } from 'utils/AuthProvider'; 
import { getAssignments, getStudentAssignments } from 'utils/InsightsProvider';

import '../assets/styles/pages/InsightsPage.scss'

export default function InsightsPage() {

    const navigate = useNavigate();
    const currentUser = useAuth()

    const classID = useParams().classID

    const [chartData, setChartData] = useState<{ name: string, grade: number }[]>([]);
    const [assignmentTitle, setTitle] = useState('');
  
    function returnToDashboard() {
        navigate(`/home/${classID}`)
    }
  
    const [facets, setFacets] = useState<Facet[]>([]);
    const [selectedFacets, setSelectedFacets] = useState<FacetSelection>({});

    const handleSelectionChange = (newSelection: FacetSelection) => {
      setSelectedFacets(newSelection);
      // chartData(reloadChart(selectedFacets, Number(classID)));
      // reloadChart(selectedFacets, Number(classID))
      console.log('Selected Facets:', newSelection);
    };

    async function reloadChart(selectedFacets:FacetSelection, class_id:number) {
      try {
        const defaultData = await getStudentAssignments(selectedFacets, class_id) as Assignment[];
        console.log(defaultData)
        
        // const data = defaultData.map(student => ({
        //   name: `${student.full_name}`,  // Concatenate first name and last name
        //   grade: student.marks_awarded   // Assuming this is the grade
        // })).sort((a, b) => a.name.localeCompare(b.name));

        // const assignmentTitle = defaultData[0].assignment_title

        // return{ data, assignmentTitle };
      } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
      }
    }

    // use a hook
    useEffect(() => {
      const fetchData = async () => {
        try {
          const defaultData = await getStudentAssignments(selectedFacets, Number(classID)) as Assignment[];
          // Do something with defaultData (e.g., set state)
          console.log(defaultData);
        } catch (error) {
          console.error('Error fetching student assignments:', error);
        }
      };
    
      if (selectedFacets) { 
        fetchData();
      }
    }, [selectedFacets, classID]);

    async function populateDefaultdata() {
      try {
        const defaultData = await getAssignments(currentUser, Number(classID)) as Assignment[];

        console.log(defaultData)
        
        const data = defaultData.map(student => ({
          name: `${student.full_name}`,  // Concatenate first name and last name
          grade: student.marks_awarded   // Assuming this is the grade
        })).sort((a, b) => a.name.localeCompare(b.name));

        const assignmentTitle = defaultData[0].assignment_title

        return{ data, assignmentTitle };
      } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
      }
    }

    useEffect(() => {
      async function loadChartData() {
        const response: never[] | { data: { name: string; grade: number }[]; assignmentTitle: string } = await populateDefaultdata();

        // setChartData(response.assignmentTitle); // Update the state with fetched data
        
        if (Array.isArray(response)) {
          console.log("Response is an empty array.");
        } else if (response && 'data' in response) {

            const { data, assignmentTitle } = response;
            const facets = [
              { name: 'Grade', values: ['10', '20', '50', '90'] },
              { name: 'Student', values: data.map(student => student.name).sort((a, b) => a.localeCompare(b))},
            ];

            setChartData(data)
            setFacets(facets)
            setTitle(assignmentTitle)

        } else {
            console.error("Invalid response format");
        }
        // setLoading(false);  // Mark loading as complete
      }

      async function loadFacets() {
        

        
      }

      loadChartData();
      loadFacets();
    }, []);  // Empty dependency array to ensure this runs only once, on mount


    return (
      <div className="insights-container">
        <motion.div
          initial={{ opacity: 0, y: 0 }}      // Starting state
          animate={{ opacity: 1, y: 0 }}       // Animation to final state
          exit={{ opacity: 0, y: 20 }}         // Exit state
          transition={{ duration: 0.5 }}       // Duration of the animation
        >
          <ReturnBtn onReturn={returnToDashboard}/>
          <div className='insights-content-container'>
            <div className='insights-chart-container'>
              <h1>{assignmentTitle}</h1>
              {/* <RenderLineChart width={1000} height={700} data={data}/> */}
              <RenderBarChart width={300} height={700} data={chartData}/>
            </div>
            <div className='insights-facets-container'>
              <FacetsMenu facets={facets} onSelectionChange={handleSelectionChange}/>
            </div>
          </div>
        </motion.div>
      </div>
    );
}