import React from 'react'
import './Loginfile.css'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const Navigate = useNavigate();
  
    return (
    
   <div className="loginbackgroundpart">
    <img src="/image.png" alt="Background" className="loginimage"/>
    <div className="wrapperlogin">
        <form 
        onSubmit={(e)=> {
            e.preventDefault();
            Navigate('/home');
        }}
             >
            <h1>Log<span>IN</span></h1>
            <div className="input-box1">
                <input type="text" placeholder="Username" required/>

            </div>

            <div className="input-box1">
                <input type="password" placeholder="Password" required/>
            </div>

            <div className="remember-forgot1">
                <label> <input type="checkbox"/> Remember me</label>
                <Link to="/forgetpassword">Forgot password?</Link>
            </div>

            <button type="Submit" className="loginbtn" onclick={()=>Navigate("/Home")}>Login</button>

            <div className="register-link1">
                <p> Don't have an account? <Link to="/registerform">Create Account</Link></p>
            </div>

            <div className="admin-doctor1">
                <p> Admin Login? <Link to="/adminlogin">Click here</Link></p>
               
</div>
        </form>
        </div>
    </div>
    
  )
}   