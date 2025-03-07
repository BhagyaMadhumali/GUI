const express = require("express");
const router = express.Router();
const db = require("./db"); 

router.post("/addAppointment", (req, res) => {
  const { fullName, age, email, doctorName, doctorSpecialty, selectDate } = req.body;

  console.log("Received appointment data:", { fullName, age, email, doctorName, doctorSpecialty, selectDate });

  if (!fullName || !age || !email || !doctorName || !doctorSpecialty || !selectDate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO channelling (full_name, age, email, doctor_name, doctor_specialty, select_date, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(query, [fullName, age, email, doctorName, doctorSpecialty, selectDate], (err, result) => {
    if (err) {
      console.error("Error adding appointment:", err);
      return res.status(500).json({ error: "Failed to add appointment" });
    }

    console.log("Appointment added successfully:", result);
    res.status(200).json({ message: "Appointment added successfully", appointmentId: result.insertId });
  });
});

router.get("/appointments", (req, res) => {
  const query = "SELECT * FROM channelling ORDER BY select_date DESC";  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }

    res.status(200).json(results);
  });
});

router.put("/appointments/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Confirmed", "Cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const query = "UPDATE channelling SET status = ? WHERE id = ?";

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating appointment status:", err);
      return res.status(500).json({ error: "Failed to update appointment status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: `Appointment status updated to ${status}` });
  });
});

module.exports = router;