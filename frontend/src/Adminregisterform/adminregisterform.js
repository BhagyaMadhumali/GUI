import React from 'react'
import './adminregisterform.css'
import {Link, useNavigate} from 'react-router-dom'
export default function AdminRegisterform() {
    const Navigate = useNavigate();
 
    return (
    
   <div className="accountbackgroundpart">
    <img src="/image.png" alt="Background" className="accountimage"/>
    <div className="wrapperaccount">
        <form  onSubmit={(e)=> {
            e.preventDefault();
            Navigate('/adminheader');
        }}
             >
            <h1>Create <span>Account</span></h1>
            <div className="input-box12">
                <input type="text" placeholder="First Name" required/>

            </div>

            <div className="input-box12">
                <input type="text" placeholder="Last Name" required/>

            </div>

            <div className="input-box12">
                <input type="password" placeholder="Age" required/>
            </div>

            <div className="input-box12">
                <input type="text" placeholder="Enter your email" required/>
            </div>

            <div className="input-box12">
                <input type="password" placeholder="Password" required/>
            </div>

            <div className="input-box12">
                <input type="password" placeholder="confirm your Password" required/>
            </div>

            <div className="remember-forgot12">
                <label> <input type="checkbox"/> Remember me</label>
            </div>

            <button type="Submit" className="accountbtn">Submit</button>

            <div className="register-link12">
                <p> Already have an account? <Link to="/adminlogin">Login Here</Link></p>
            </div>

 
        </form>
        </div>
    </div>
    
  )
}   