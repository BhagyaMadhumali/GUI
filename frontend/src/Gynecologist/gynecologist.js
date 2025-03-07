import React, { useState, useEffect } from "react";
import "./gynecologist.css";
import Headercomponent from "../Headercomponent/headercomponent";
import axios from "axios";

export default function Gynecologist() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    doctorName: "",
    doctorSpecialty: "",
    selectDate: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        fullName: formData.fullName,
        age: formData.age,
        email: formData.email,
        doctorName: formData.doctorName,
        doctorSpecialty: formData.doctorSpecialty || "Gynecologist", 
        selectDate: formData.selectDate,
      };

      console.log("Sending appointment data:", appointmentData);

      const response = await axios.post("http://localhost:5000/api/addAppointment", appointmentData);

      console.log("Appointment added successfully:", response.data);

      setFormData({ fullName: "", age: "", email: "", doctorName: "", doctorSpecialty: "", selectDate: "" });
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors");
      setDoctors(response.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleSelectDoctor = (doctor) => {
    setFormData({
      ...formData,
      doctorName: doctor.doctor_name,
      doctorSpecialty: doctor.specialty,
    });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <Headercomponent/>
      <div className="gynecologist">
        <div className="gynecologist-container">
          <h1>{editingDoctorId ? "Update Gynecologist" : "Add Appointment"}</h1>
          <form onSubmit={handleAddDoctor}>
            <div className="input-box">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="doctorName">Doctor Name</label>
              <input
                type="text"
                id="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                placeholder="Enter doctor's name"
                readOnly
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="doctorSpecialty">Doctor Specialty</label>
              <input
                type="text"
                id="doctorSpecialty"
                value={formData.doctorSpecialty}
                onChange={handleInputChange}
                placeholder={editingDoctorId ? "" : "Gynecologist"} 
                readOnly 
              />
            </div>
            <div className="input-box">
              <label htmlFor="selectDate">Appointment Date</label>
              <input
                type="date"
                id="selectDate"
                value={formData.selectDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              {editingDoctorId ? "Update Gynecologist" : "Add Appointment"}
            </button>
          </form>
        </div>

        <div className="doctor-list">
          <h1>Doctors List</h1>
          <table>
            <thead>
              <tr>
                <th>Doctor Image</th>
                <th>Doctor Name</th>
                <th>Specialty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <img
                      src={`data:image/jpeg;base64,${doctor.image}`} 
                      alt="Doctor"
                      className="doctor-img"
                    />
                  </td>
                  <td>{doctor.doctor_name}</td>
                  <td>{doctor.specialty || "Not Specified"}</td>
                  <td>
                    <button
                      className="select-btn"
                      onClick={() => handleSelectDoctor(doctor)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}