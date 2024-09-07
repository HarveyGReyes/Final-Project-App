import { db } from "../config/db";
import { SECRET_KEY } from "../server";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =======================================================================
// Handle login
export const login = async (req: any, res: any) => {
    const { username, password } = req.body;
    console.log("backend username:",username)
    console.log("backend password:",password)
  
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
        console.log('Hashed ', password, ' into ', hashedPassword);
        // Store hashedPassword in the database
      });
  
      const user = results[0];
      if (user){
        console.log("user found: ",user)
      }
      else
      {
        return res.status(404).json({ error: 'Username does not exist' })
      }
      
      // Compare the provided password with the stored hash
      const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
      console.log(bcrypt.compare(password, user.password_hash))
      
      if (isPasswordMatch) {
        const payload = { userId: user.user_id, username: user.username };
        
        //add try here
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        console.log("Auth token generated", token)
  
        res.cookie('authToken', token, {
          httpOnly: false, // Ensures the cookie is accessible only by the web server
          secure: false, // Set to true if you're using HTTPS
          sameSite: 'lax', // Helps mitigate CSRF attacks
          maxAge: 3600000
        });
  
        res.status(200).json({ message: 'Login successful', user: { id: user.user_id, username: user.username }, authToken: token});
      }
      else{
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  };
  