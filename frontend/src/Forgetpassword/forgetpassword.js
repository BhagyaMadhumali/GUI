import React from 'react'
import './forgetpassword.css'
import {useNavigate} from 'react-router-dom'

export default function Forgetpassword() {
  const Navigate = useNavigate();
  
    return (
    
    <div className="forbackgroundpart">
    <img src="/image.png" alt="Background" className="forimage"/>
    <div className="wrapperfor">
        <form  onSubmit={(e)=> {
            e.preventDefault();
            Navigate('/home');
        }}
             >
            <div className="input-box14">
                <input type="text" placeholder="Enter your new password" required/>

            </div>

            <div className="input-box14">
                <input type="password" placeholder="Confirm your password" required/>
            </div>

            <div className="remember-forgot14">
                <label> <input type="checkbox"/> Remember me</label>
             
            </div>

            <button type="Submit" className="forbtn" onclick={()=>Navigate("/Home")}>Login</button>



            
        </form>
        </div>
    </div>
    
  )
}
