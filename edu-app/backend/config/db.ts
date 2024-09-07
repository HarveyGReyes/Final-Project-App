const mysql = require('mysql')

export const db = mysql.createConnection({
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

// =======================================================================
// Test Query
const query = 'SELECT user_id, username, password_hash FROM users';
db.query(query, (err: any, results: any) => {
  if (err) {
    console.error('Error executing MySQL query:', err);

  } else {
    // console.log('Output: successful', results);
    // console.log(query)
  }
});