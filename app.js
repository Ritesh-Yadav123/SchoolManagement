const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());

const pathname = path.join(__dirname, 'public');
app.use(express.static(pathname));

app.get('/', (req, res) => {
  res.sendFile(path.join(pathname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(pathname, 'adminLogin.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(pathname, 'classes.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const sanitizedEmail = String(email).trim();
  const sanitizedPassword = String(password).trim();

  const query = 'SELECT * FROM admin WHERE (email = ? OR user = ?) AND password = ?';
  db.query(query, [sanitizedEmail, sanitizedEmail, sanitizedPassword], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      res.redirect('/dashboard?message=Login%20successful');
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});