import React from 'react';
import './contactus.css';
import Headercomponent from "../Headercomponent/headercomponent";
export default function ContactUs() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for reaching out! We will get back to you shortly.');
  };

  return (

    <section className="contact-us-section">
            <Headercomponent/>

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
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your Message" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
