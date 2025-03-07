import React, { useState } from 'react';
import './contactus.css';
import Headercomponent from "../Headercomponent/headercomponent";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {

      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      alert(result.error || 'Failed to send message');
    }
  };

  return (
    <section className="contact-us-section">
      <Headercomponent />

      <div className="backpic">
        <img src="/image.png" className="imagecon" alt="background" />

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p>Phone: <a href="">+94766849020</a></p>
          <p>Email: <a href="" target="_blank">lifeclinichealthcare@.com</a></p>
          <p>Address: 123 Life Clinic Health Care, Galle</p>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                placeholder="Your Message" 
                rows="4" 
                value={formData.message} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
