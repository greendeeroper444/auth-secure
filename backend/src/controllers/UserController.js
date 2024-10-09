const bcrypt = require('bcryptjs');
const db = require('../../src/config/db');

// register a new user
// exports.registerUser = (req, res) => {
//     const { username, password } = req.body;

//     //hash the password before saving to the database
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) return res.status(500).json({ 
//             error: 'Error hashing password' 
//         });

//         const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//         db.query(query, [username, hash], (error, results) => {
//         if (error) {
//             return res.status(500).json({ 
//                 error: 'Database error' 
//             });
//         }
//         res.status(201).json({ 
//             message: 'User registered successfully' 
//         });
//         });
//     });
// };

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
  
    //directly store the plain text password (not secure)
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (error, results) => {
        if (error) {
            return res.status(500).json({ 
                error: 'Database error' 
            });
        }
        res.status(201).json({ 
            message: 'User registered successfully' 
        });
    });
};
  