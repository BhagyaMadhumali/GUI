import React from 'react';
import './home.css'; 
import Headercomponent from '../Headercomponent/headercomponent'; 
import {useNavigate} from 'react-router-dom'

export default function Home() {
   
  const navigate = useNavigate();
  
  return (
      <>
       
        <Headercomponent />
  
        <section className="home" id="home">
          <div className="image">
            <img
              className="homepic"
              src="homeimage2.png"
              alt="Stay Safe, Stay Healthy"
            />
          </div>
  
          <div className="content">
            <h3>Stay Safe, Stay Healthy</h3>
            <p>
              Your health and safety are our utmost priority. We are committed
              to providing a secure and caring environment where your
              well-being is protected every step of the way.
            </p>
            <button type="Submit" className="btn"  onClick={() => navigate('/alldoctors')}>Book Appointment</button>
          </div>
        </section>
  
        <section className="footer">
          <div className="footer-content">
            <h2>Find Speciality</h2>
            <p>
              Effortlessly explore our comprehensive directory of trusted
              doctors <br />
              and book your appointment with ease.
            </p>
          </div>
        </section>
      </>
    );
  }
  