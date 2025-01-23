import React, { useState } from 'react';
import './adminheader.css';
import AdminComponent from '../AdminComponent/admincomponent';
import {useNavigate} from 'react-router-dom'
export default function AdminHeader() {
 const Navigate = useNavigate();
 
  const [messages, setMessages] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', message: 'Inquiry about dermatology services', status: 'Unread' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', message: 'Booking an appointment for a child check-up', status: 'Unread' },
  ]);

  const handleMarkAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, status: 'Read' } : message
      )
    );
  };

  return (
    <>
      <AdminComponent />
      <section>
        <div className="boxes-container">
          <div className="box pending-container" onClick={()=>Navigate('/appointment')}>
            <h1>Pending Appointments</h1>
          </div>

          <div className="box allappointment-container"  onClick={()=>Navigate('/appointment')}>
            <h1>All Appointments</h1>
          </div>

          <div className="box unread-container"  onClick={()=>Navigate('/messages')}>
            <h1>Unread Messages</h1>
          </div>

          

          <div className="box allmessages-container"  onClick={()=>Navigate('/messages')}>
            <h1>All Messages</h1>
          </div>
        </div>

        <div className="latest">
          <div className="latest-appointment"  onClick={()=>Navigate('/appointment')}>
            <h1>Latest 10 Appointments</h1>
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

          <div className="latest-messages" onClick={()=>Navigate('/messages')}>
            <h1>Latest 10 Messages</h1>
            <table className="messages-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>
                      <a href={`mailto:${message.email}`}>{message.email}</a>
                    </td>
                    <td>{message.message}</td>
                    <td>{message.status}</td>
                    <td>
                      {message.status === 'Unread' && (
                        <button
                          className="mark-read-btn"
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                      {message.status === 'Read' && <span>Read</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
