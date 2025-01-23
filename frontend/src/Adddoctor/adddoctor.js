import React, { useState } from "react";
import "./adddoctor.css";
import AdminComponent from "../AdminComponent/admincomponent";

export default function AddDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    image: null,
    workingDays: [
      { day: "", time: "" },
      { day: "", time: "" },
      { day: "", time: "" },
    ],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleDayTimeChange = (index, field, value) => {
    const updatedWorkingDays = [...formData.workingDays];
    updatedWorkingDays[index][field] = value;
    setFormData({ ...formData, workingDays: updatedWorkingDays });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    setDoctors([...doctors, { ...formData, id: Date.now() }]);
    setFormData({
      name: "",
      specialty: "",
      image: null,
      workingDays: [
        { day: "", time: "" },
        { day: "", time: "" },
        { day: "", time: "" },
      ],
    });
  };

  return (
    <>
      <AdminComponent />
      <div className="add-doctor">
        <div className="add-doctor-container">
          <h1>Add Doctor</h1>
          <form onSubmit={handleAddDoctor}>
            <div className="image-upload">
              {formData.image && <img className="image2" src={formData.image} alt="Doctor" />}
              <label htmlFor="image">Upload Doctor Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className="input-box">
              <label htmlFor="name">Doctor Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter doctor's name"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="specialty">Specialty</label>
              <select
                id="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Specialty</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="days-times">
              <h2>Working Days & Times</h2>
              {formData.workingDays.map((entry, index) => (
                <div className="day-group" key={index}>
                  <label>Day {index + 1}</label>
                  <select
                    value={entry.day}
                    onChange={(e) => handleDayTimeChange(index, "day", e.target.value)}
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <select
                    value={entry.time}
                    onChange={(e) => handleDayTimeChange(index, "time", e.target.value)}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="9AM-12PM">9AM-12PM</option>
                    <option value="12PM-4PM">12PM-4PM</option>
                    <option value="4PM-9PM">4PM-9PM</option>
                  </select>
                </div>
              ))}
            </div>
            <button type="submit" className="add-doctor-btn">
              Add Doctor
            </button>
          </form>
        </div>

        <div className="doctor-list">
          <h1>Doctor List</h1>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    {doctor.image && <img className="image2" src={doctor.image} alt="Doctor" />}
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    {doctor.workingDays
                      .filter((entry) => entry.day && entry.time)
                      .map((entry, i) => (
                        <div key={i}>
                          {entry.day}: {entry.time}
                        </div>
                      ))}
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
