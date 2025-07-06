const express = require("express");
const path = require("path");
const db = require("./db");
const studentRoutes = require("./student");
const admissionRoutes=require("./admission");
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const session = require("express-session");

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));



app.use(express.json());

const pathname = path.join(__dirname, "public");
app.use(express.static(pathname));


app.get("/", (req, res) => {
  res.sendFile(path.join(pathname, "index.html"));
});


app.get("/admin", (req, res) => {
  res.sendFile(path.join(pathname, "adminLogin.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(pathname, "classes.html"));
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const query = "SELECT * FROM admin WHERE (email = ? OR user = ?) AND password = ?";
  db.query(query, [email.trim(), email.trim(), password.trim()], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Internal server error" });

    if (results.length > 0) {
      req.session.isLoggedIn = true;
      res.redirect("/dashboard");
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Other requires and middleware above...

// 🔐 Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }
  return res.status(401).sendFile(path.join(pathname, "error.html"));
}

// 👇 Protect /student routes
app.use("/student", isAuthenticated, studentRoutes);

app.use("/admission", isAuthenticated, admissionRoutes);


// THERE IS LITTLE BIT ERROR HERE 

// app.get('*', (req, res) => {
//   res.status(404).send("❌ Route not found!");
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
