import React, { useState, useEffect } from "react";
import "./adddoctor.css";
import AdminComponent from "../AdminComponent/admincomponent";
import axios from "axios";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    image: null,
  });

  const [doctors, setDoctors] = useState([]);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = new FormData();
    doctorData.append("doctor_name", formData.name);
    doctorData.append("specialty", formData.specialty);

    if (formData.image) {
      doctorData.append("image", formData.image);
    }

    try {
      if (editingDoctorId) {

        await axios.put(`http://localhost:5000/api/updateDoctor/${editingDoctorId}`, doctorData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingDoctorId(null);
      } else {

        await axios.post("http://localhost:5000/api/addDoctor", doctorData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ name: "", specialty: "", image: null });
      fetchDoctors(); 
    } catch (err) {
      console.error("Error adding/updating doctor:", err);
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

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteDoctor/${id}`);
      fetchDoctors(); 
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleUpdate = (doctor) => {
    setFormData({
      name: doctor.doctor_name,
      specialty: doctor.specialty,
      image: null,
    });
    setEditingDoctorId(doctor.id); 
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <AdminComponent />
      <div className="add-doctor">
        <div className="add-doctor-container">
          <h1>{editingDoctorId ? "Update Doctor" : "Add Doctor"}</h1>
          <form onSubmit={handleAddDoctor}>
            <div className="image-upload">
           
              {formData.image && (
                <div className="image-container">
                  <img
                    className="image2"
                    src={URL.createObjectURL(formData.image)}
                    alt="Doctor"
                  />
                </div>
              )}

              {!formData.image && editingDoctorId && doctors.length > 0 && (
                <div className="image-container">
                  <img
                    className="image2"
                    src={`data:image/jpeg;base64,${doctors.find(doctor => doctor.id === editingDoctorId)?.image}`}
                    alt="Doctor"
                  />
                </div>
              )}
              
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
            <button type="submit" className="add-doctor-btn">
              {editingDoctorId ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>

        <div className="doctor-list">
        <h1>Doctors List</h1>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    {doctor.image && (
                      <div className="image-container">
                        <img
                          className="doctor-img"
                          src={`data:image/jpeg;base64,${doctor.image}`}
                          alt="Doctor"
                        />
                      </div>
                    )}
                  </td>
                  <td>{doctor.doctor_name}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleUpdate(doctor)}
                    >
                      Update
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(doctor.id)}
                    >
                      Cancel
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
