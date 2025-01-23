import React from 'react'
import './Adminlogin.css'
import {Link, useNavigate} from 'react-router-dom'
export default function AdminLogin() {
    const Navigate = useNavigate();

 
    return (
    
    <div className="adminbackgroundpart">
    <img src="/image.png" alt="Background" className="adminimage"/>
    <div className="wrapperadmin">
        <form onSubmit={(e)=> {
            e.preventDefault();
            Navigate('/adminheader');
        }}>
            <h1>ADM<span>IN </span> LOG<span>IN</span></h1>
            <div className="input-box13">
                <input type="text" placeholder="Username" required/>

            </div>

            <div className="input-box13">
                <input type="password" placeholder="Password" required/>
            </div>

            <div className="remember-forgot13">
                <label> <input type="checkbox"/> Remember me</label>
               <Link to="/adminforgetpassword">Forgot password?</Link>
            </div>

            <button type="Submit" className="adminbtn">Login</button>

<div className="register-link1">
                <p> Don't have an account? <Link to="/adminregisterform">Create Account</Link></p>
            </div>

            
        </form>
        </div>
    </div>
    
  )
}
