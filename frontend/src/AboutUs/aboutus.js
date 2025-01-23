import React from 'react';
import './aboutus.css';
import Headercomponent from '../Headercomponent/headercomponent'; 
import { Link } from 'react-router-dom';

export default function AboutUs() {
  
  return (
    <>
      <Headercomponent />
      <section className="about" id="about">
        <div className="image5">
          <img src="aboutus.avif" alt="About Us" className="aboutimage" />
        </div>

        <div className="content">
          <h3>We take care of your healthy life.</h3>
          <p>
            Welcome to our hospital appointment system, where health meets convenience. 
            We understand the challenges of managing healthcare in today’s busy world, 
            so we’ve created a seamless platform to make scheduling medical appointments simple and stress-free. 
            With just a few clicks, you can access trusted healthcare professionals while prioritizing your well-being.
          </p>
          <p>
            Our mission is to enhance the healthcare experience with a secure, efficient, and user-friendly platform. 
            By eliminating the hassles of traditional appointment processes, we offer a reliable way to book, manage, 
            and track your healthcare visits from home.
          </p>
        </div>
      </section>

      <section className="services" id="services">

<h1 className="headingabout"> our <span>services</span></h1>
<div className="services-box-container">
    
<div className="services-box">
    <h3> free checkup</h3>
    <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>
    <Link to="/contactus" className="aboutbtn">contact Us </Link>
</div>

<div class="services-box">
    <h3> 24/7 ambulance</h3>
    <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>
    <Link to="/contactus" className="aboutbtn">contact us </Link>
</div>

<div class="services-box">
    <h3> expert doctors</h3>
    <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>

    <Link to="/alldoctors" className="aboutbtn">contact us </Link>
</div>

<div class="services-box">
    <h3> medicines</h3>
   <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>
   <Link to="/contactus" className="aboutbtn">contact us </Link>
   </div>

<div class="services-box">
    <h3> bed facility</h3>
    <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>
    <Link to="/contactus" className="aboutbtn">contact us </Link>
</div>

<div class="services-box">
    <h3> total care</h3>
    <p>Your health and safety are our priority – stay protected and take charge of your well-being today.</p>
    <Link to="/contactus" className="aboutbtn">contact us </Link>
</div>



</div>

</section>

    </>
  );
}
