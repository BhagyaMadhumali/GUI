import React from 'react'
import './headercomponent.css'
import {Link ,useNavigate} from 'react-router-dom'
export default function Headercomponent() {
 const Navigate = useNavigate();
 
  return (
    <div className="header">
    <a href="#" className="lifeclinic">
      <img className="logo" src="/logo2.avif" alt="LifeClinic Logo" /> LifeClinic
    </a>

    <nav className="navbar">
      <Link to="/home">HOME</Link>
      <Link to="/alldoctors">ALL DOCTOR</Link>
      <Link to="/aboutus">ABOUT</Link>
      <Link to="/contactus">CONTACT US</Link>
    </nav>

<button type="submit" className="logoutbtn" onClick={()=>Navigate('/logout')}> Logout</button>
    
  </div>
  );
}
