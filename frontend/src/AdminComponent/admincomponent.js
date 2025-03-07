import React from 'react'
import './admincomponent.css'
import {Link ,useNavigate} from 'react-router-dom'
export default function AdminComponent() {
 const Navigate = useNavigate();
 
  return (
    <div className="header">
    <a href="#" className="lifeclinic">
      <img className="logo" src="/logo2.avif" alt="LifeClinic Logo" /> LifeClinic
    </a>

    <nav className="navbar">

      <Link to="/adddoctor">Add Doctor</Link>
      <Link to="/appointment">Appointment</Link>
      <Link to="/messages">Messages</Link>

    </nav>

<button type="submit" className="logoutbtn" onClick={()=>Navigate('/logout')}> Logout</button>
    
  </div>
  );
}
