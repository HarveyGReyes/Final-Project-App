import { db } from "../config/db";

export const load_classes = async (req: any, res: any) => {
    const { employee_id } = req.query;

    const query = 'SELECT * FROM classes WHERE teacher_id = ?';
    db.query(query, [employee_id], async (err: any, results: any) => {
        if (!results) {
            return res.status(404).json({message: 'No classes found for this user'})
        }
        else{
            return res.status(200).json({message: `Found ${results.length} classes`, classes: results})
        }
    })  
};
