const express = require('express');
const mysql = require('mysql')
const cors = require('cors'); 
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"harvey",
    database:"edu-app"
});

// Connect to the MySQL database
db.connect((err: any) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

const query = 'SELECT * FROM users';
db.query(query, (err: any, results: any) => {
  if (err) {
    console.error('Error executing MySQL query:', err);

  } else {
    console.log('Output: successful', results);
    console.log(query)
  }
});

app.post('/api/login', (req: any, res: any) => {
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
      // return res.status(404).json({ error: 'Username does not exist' })
      return res.status(404).json({ error: 'Username does not exist' })
    }
    
    // Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    console.log(bcrypt.compare(password, user.password_hash))
    
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.user_id, username: user.username } });
  });
});


// Set up the routes
const port = 3001;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
