import axios from 'axios';
import { resolve } from 'path';
import { FacetSelection } from 'types/types';

export async function getAssignments (user:any, class_id:number) {
    try {
        const response = await axios.get('http://localhost:3001/api/all_assignments',
        {
            headers: {
                'X-Class-ID': class_id,  // Assuming currentUser is a token or identifier
            },
            withCredentials: true, // Ensure cookies are sent and received
        });
        return new Promise((resolve, reject) => {resolve(response.data.results)});
        
    } catch (error) {
        console.error('Failed:', error);
        // throw new Error('Failed request');
    }
};

export async function getStudentAssignments (selectedFacets:FacetSelection, class_id:number) {
    console.log(selectedFacets)
    try {
        const response = await axios.get('http://localhost:3001/api/filtered_student_assignments',
        {
            headers: {
                'X-Class-ID': class_id,  // Assuming currentUser is a token or identifier
                'X-Requested-Filters': JSON.stringify(selectedFacets)
            },
            withCredentials: true, // Ensure cookies are sent and received
        });
        return new Promise((resolve, reject) => {resolve(response.data.results)});
        
    } catch (error) {
        console.error('Failed:', error);
        // throw new Error('Failed request');
    }
}
