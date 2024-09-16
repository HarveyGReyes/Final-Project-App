import { db } from "../config/db";
import axios from 'axios';

import { verify_user } from "../middlewares/authMiddleware";

// import { insightService } from "../services/insightsService";

const insightService = require("../services/insightsService")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const all_assignments = async (req: any, res: any) => {
    try {
        const headers = req['headers']
        const token = await axios.get('http://localhost:3001/api/verify_user', {
            headers
        });

        const user = token.data.user
        const class_id = headers['x-class-id']

        const response = await insightService.getAllAssignments(user,class_id);
        res.status(200).json({message:'Success', results:response});

    } catch (error) {
        console.error('Failed:', error);
        // throw new Error('Failed user');
    }

};

export const student_assignments = async (req: any, res: any) => {
    try {
        const headers = req['headers']
        // const token = await axios.get('http://localhost:3001/api/verify_user', {
        //     headers
        // });

        // const user = token.data.user
        const class_id = headers['x-class-id']
        const names = JSON.parse(headers['x-requested-filters'])

        const response = await insightService.getFilteredStudentAssignments(names, class_id);
        res.status(200).json({message:'Success'});

    } catch (error) {
        console.error('Failed:', error);
        // throw new Error('Failed user');
    }
}

