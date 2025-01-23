import React, { useState, useEffect } from "react";
import "./messages.css";
import AdminComponent from "../AdminComponent/admincomponent";

export default function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello, I would like to book an appointment.",
      status: "Unread",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      message: "Can you provide information about your services?",
      status: "Read",
    },
  ]);

  const handleMarkAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, status: "Read" } : msg
      )
    );
  };

  return (
    <>
      <AdminComponent />
      <div className="message-dashboard-container">
        <h1>Messages</h1>
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
                  {message.status === "Unread" && (
                    <button
                      className="mark-read-btn"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  {message.status === "Read" && <span>Read</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
