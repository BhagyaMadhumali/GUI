import React, { useState, useEffect } from "react";
import "./appointment.css";
import AdminComponent from "../AdminComponent/admincomponent";
import axios from "axios";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, { status });
      fetchAppointments(); 
    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <AdminComponent />
      <div className="dashboard-container">
        <h1>Appointments</h1>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.full_name}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.doctor_specialty}</td>
                  <td>{new Date(appointment.select_date).toLocaleDateString()}</td>
                  <td>{new Date(appointment.select_date).toLocaleTimeString()}</td>
                  <td>
                    {appointment.status === "Pending" ? (
                      <>
                        <button
                          className="confirm-btn"
                          onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                        >
                          Confirm
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => updateAppointmentStatus(appointment.id, "Cancelled")}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className={`status-btn ${appointment.status.toLowerCase()}`}
                        disabled
                      >
                        {appointment.status}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}