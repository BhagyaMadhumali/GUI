import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './Loginfile.css';

export default function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const Navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
                password: password,
            }),
        });

        const data = await response.json();
        
        if (response.status === 200) {
            localStorage.setItem('authToken', data.token);
            
            Navigate('/home');
        } else {
            setError(data.message); 
        }
    } catch (err) {
        console.error('Error during login:', err);
        setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="loginbackgroundpart">
      <img src="/image.png" alt="Background" className="loginimage" />
      <div className="wrapperlogin">
        <form onSubmit={handleLogin}>
          <h1>Log<span>IN</span></h1>

          <div className="input-box1">
            <input
              type="email" 
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-box1">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Remember me and forgot password
          <div className="remember-forgot1">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgetpassword">Forgot password?</Link>
          </div> */}

          <button type="Submit" className="loginbtn">
            Login
          </button>

          {error && <p className="error-message">{error}</p>}

          <div className="register-link1">
            <p> Don't have an account? <Link to="/registerform">Create Account</Link></p>
          </div>

          <div className="admin-doctor1">
            <p> Admin Login? <Link to="/adminlogin">Click here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
