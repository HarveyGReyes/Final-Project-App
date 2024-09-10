import { db } from "../config/db";
import { SECRET_KEY } from "../server";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =======================================================================
// Handle login
export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  // Query the database for the user with the provided username
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Hashing passwords
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err: any, hashedPassword: any) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      // console.log('Hashed ', password, ' into ', hashedPassword);
      // Store hashedPassword in the database
    });

    const user = results[0];
    if (user){
      // console.log("User found: ",user)
    }
    else
    {
      return res.status(404).json({ error: 'Username does not exist' })
    }
    
    // Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (isPasswordMatch) {
      let employee_id: number | null = null;
      if (user.type === 'teacher' || user.type === 'admin'){
         employee_id = await get_employee_id(user.user_id);
      }
      else {employee_id = null}
      
      console.log('this is employment_id', employee_id)

      const payload = { user_id: user.user_id, username: user.username, type: user.type, employee_id: employee_id};

      //add try here
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

      res.cookie('authToken', token, {
        httpOnly: true, // Ensures the cookie is accessible only by the web server
        secure: false, // Set to true if you're using HTTPS
        sameSite: 'lax', // Helps mitigate CSRF attacks
        maxAge: 3600000
      });

      res.status(200).json({ message: 'Login successful', user: { user_id: user.user_id, username: user.username, type: user.type, employee_id: employee_id}, authToken: token});
    }
    else{
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};

const get_employee_id = (userid: number): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT employee_id FROM teachers WHERE user_id = ?';
    
    db.query(query, [userid], (err: any, results: any) => {
      if (err) {
        reject(err);  // Reject the promise with the error
      } else if (results.length > 0) {
        const employee_id = results[0].employee_id;
        console.log("Employee ID found: ", employee_id);
        resolve(employee_id);  // Resolve the promise with the teacher ID
      } else {
        console.log("No teacher ID found");
        resolve(null);  // Resolve the promise with null if no teacher ID is found
      }
    });
  });
};
  