import { db } from "../config/db";
import axios from 'axios';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const insightService = {
    getAllAssignments: async (user:any, class_id:number) => {
        const teacher_id = user.employee_id

        const query = `SELECT class_name, subject, s.student_id, concat(first_name, ' ', last_name) as full_name, marks_awarded, assignment_title, max_marks, due_date
                        FROM classes c
                        JOIN class_enrollments ce ON c.class_id = ce.class_id
                        JOIN students s ON ce.student_id = s.student_id
                        JOIN users u ON s.user_id = u.user_id
                        JOIN student_assignments sa ON s.student_id = sa.student_id
                        JOIN assignments a ON sa.assignment_id = a.assignment_id
                        WHERE c.class_id = 1`;

        return new Promise((resolve, reject) => {
            db.query(query, [class_id], (err: any, results: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return reject(err);  // Reject the Promise with the error
                }
                resolve(results);  // Resolve the Promise with the results
            });
        });
    },

    getFilteredStudentAssignments: async (student_name:Array<string>, assignment_id:number) => {
        // const student_name = 

      

        return new Promise((resolve, reject) => {
           
        });
    }
};



module.exports = insightService;