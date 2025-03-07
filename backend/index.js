const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const User = require("./User");
const bodyParser = require("body-parser");
const addDoctorRoutes = require("./AddDoctor");
const { adminLogin } = require("./Adminlogin");
const { handleContactMessage } = require("./alert");
const channellingRoutes = require("./channelling"); 

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/register", User.registerUser);
app.post("/login", User.loginUser);
app.post("/admin/login", adminLogin);
app.post("/contact", handleContactMessage);
app.use("/api", addDoctorRoutes);
app.use("/api", channellingRoutes); 

app.get("/messages", (req, res) => {
  const query = "SELECT * FROM messages";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
    res.json(results);
  });
});

app.patch("/messages/:id/read", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE messages SET status = 'Read' WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error updating message status:", err);
      return res.status(500).json({ error: "Failed to update message status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ success: "Message marked as Read" });
  });
});

app.get("/doctors", (req, res) => {
  const query = "SELECT * FROM doctors";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ error: "Failed to fetch doctors" });
    }

    const doctorsWithImages = results.map((doctor) => {
      doctor.image = Buffer.from(doctor.image).toString("base64");
      return doctor;
    });
    res.json(doctorsWithImages);
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});