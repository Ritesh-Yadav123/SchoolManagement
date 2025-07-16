const express = require('express');
const path = require('path');
const db = require('./db');
const router = express.Router();

const pathname = path.join(__dirname, "public");

// Parse incoming data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route: Serve admission form
router.get("/", (req, res) => {
    res.sendFile(path.join(pathname, "admission.html"));
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log("Admission table connected to MySQL database");
});

// Route: Handle form submission
router.post('/', (req, res) => {
    const {
        full_name,
        gender,
        date_of_birth,
        class: studentClass,
        section,
        contact_number
    } = req.body;

    const sql = `
  INSERT INTO admission 
  (full_name, gender, date_of_birth, \`class\`, section, contact_number)
  VALUES (?, ?, ?, ?, ?, ?)
`;


    db.query(sql, [
        full_name,
        gender,
        date_of_birth,
        studentClass,
        section,
        contact_number
    ], (err, result) => {
        if (err) {
            console.error("Error while inserting the data:", err);  // 💥 Replaced window.alert
            return res.status(500).send('Something went wrong!');
        }
        console.log('Admission Form Submitted:', result);
        res.send('Admission Taken Successfully');
    });
});



module.exports = router;
