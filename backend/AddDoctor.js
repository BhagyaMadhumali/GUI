const express = require('express');
const mysql = require('mysql2');
const multer = require('multer'); 

const router = express.Router();

const db = require('./db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addDoctor', upload.single('image'), (req, res) => {
  const { doctor_name, specialty } = req.body;
  const image = req.file.buffer; 
  const query = "INSERT INTO doctors (doctor_name, specialty, image) VALUES (?, ?, ?)";
  
  db.query(query, [doctor_name, specialty, image], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding doctor', error: err });
    }
    res.status(200).json({ message: 'Doctor added successfully', doctorId: result.insertId });
  });
});

router.delete('/deleteDoctor/:id', (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM doctors WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting doctor', error: err });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
});

router.put('/updateDoctor/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { doctor_name, specialty } = req.body;
  let query;
  let values;

  if (req.file) {
    query = "UPDATE doctors SET doctor_name = ?, specialty = ?, image = ? WHERE id = ?";
    values = [doctor_name, specialty, req.file.buffer, id];
  } else {
    query = "UPDATE doctors SET doctor_name = ?, specialty = ? WHERE id = ?";
    values = [doctor_name, specialty, id];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating doctor', error: err });
    }
    res.status(200).json({ message: 'Doctor updated successfully' });
  });
});

module.exports = router;
