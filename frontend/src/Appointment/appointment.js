import React from "react";
import "./appointment.css";
import AdminComponent from "../AdminComponent/admincomponent";

export default function Appointment() {
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
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
