import React, { useState, useEffect } from "react";
import AdminComponent from "../AdminComponent/admincomponent";
import "./messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/messages");
        const data = await response.json();
        
        const sortedMessages = data.sort((a, b) => b.id - a.id);
        
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
