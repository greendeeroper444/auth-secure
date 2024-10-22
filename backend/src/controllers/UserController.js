const db = require('../../src/config/db');
const { hashPassword, comparePassword } = require('../helpers/hashHelper');
const jwt = require('jsonwebtoken');

// const pepper = process.env.PEPPER;

// register a new user
//plaintext only
// exports.registerUser = (req, res) => {
//     const { username, password } = req.body;
  
//     //directly store the plain text password (not secure)
//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(query, [username, password], (error, results) => {
//         if (error) {
//             return res.status(500).json({ 
//                 error: 'Database error' 
//             });
//         }
//         res.status(201).json({ 
//             message: 'User registered successfully' 
//         });
//     });
// };


//hash only with bcrypt
// exports.registerUser = (req, res) => {
//     const { username, password } = req.body;

//     //hash the password before saving to the database
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) return res.status(500).json({ 
//             error: 'Error hashing password' 
//         });

//         //insert the username and hashed password into the database
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
//hash with with sha256
// exports.registerUser = (req, res) => {
//     const { username, password } = req.body;

//     try {
//         //hash the password using SHA-256
//         const hash = crypto.createHash('sha256').update(password).digest('hex');

//         //insert the username and hashed password into the database
//         const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//         db.query(query, [username, hash], (error, results) => {
//             if (error) {
//                 return res.status(500).json({
//                     error: 'Database error',
//                 });
//             }
//             res.status(201).json({
//                 message: 'User registered successfully',
//             });
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: 'Hashing error',
//         });
//     }
// };

//hashwithsalt
// exports.registerUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {

//         //hash the password with bcrypt (it automatically generates a salt)
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         //insert the username and hashed password into the database
//         const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//         db.query(query, [username, hashedPassword], (error, results) => {
//             if (error) {
//                 return res.status(500).json({
//                     error: 'Database error',
//                 });
//             }
//             res.status(201).json({
//                 message: 'User registered successfully',
//             });
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: 'Hashing error',
//         });
//     }
// };


//hashwithsaltandpeppper

//register the user
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        //hash the password using the helper function
        const hashedPassword = await hashPassword(password);

        //insert the username and hashed password into the database
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Database error',
                });
            }
            res.status(201).json({
                message: 'User registered successfully',
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

//login the user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        //retrieve the hashed password from the database
        const query = 'SELECT password FROM users WHERE username = ?';
        db.query(query, [username], async (error, results) => {
            if (error) {
                console.error('Database error:', error); 
                return res.status(500).json({ 
                    error: 'Database error' 
                });
            }
            if (results.length === 0) {
                return res.status(401).json({ 
                    error: 'Username does not exist.'
                });
            }

            const hashedPassword = results[0].password;

            //compare the input password with the hashed password using the helper function
            const isMatch = await comparePassword(password, hashedPassword);

            if (!isMatch) {
                return res.status(401).json({ 
                    error: 'Incorrect Password.'
                });
            }

            const token = jwt.sign({ 
                userId: results[0].id, username }, 
                process.env.JWT_SECRET, { expiresIn: '1h' }
            );
            // res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
            res.cookie('token', token, {
                httpOnly: true,  //makes the cookie inaccessible to JavaScript
                secure: process.env.NODE_ENV === 'production',  //use true if you're in production
                sameSite: 'lax',  //adjust as necessary for your app
            });

            res.status(200).json({ 
                message: 'Login successful',
                token
            });
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

//get the user
exports.getUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ 
        error: 'Not authenticated' 
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ 
            userId: decoded.userId, username: decoded.username 
        });
    } catch (error) {
        res.status(401).json({ 
            error: 'Invalid token'
         });
    }
};
//logout the user
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ 
        message: 'Logout successful' 
    });
};