import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerform.css";

export default function Registerform() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const Navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        const { first_name, last_name, age, email, password } = formData;
    
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name, last_name, age, email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                Navigate("/home"); // Redirect on successful registration
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Error registering user");
        }
    };
    

    return (
        <div className="accountbackgroundpart">
            <img src="/image.png" alt="Background" className="accountimage" />
            <div className="wrapperaccount">
                <form onSubmit={handleSubmit}>
                    <h1>Create <span>Account</span></h1>

                    <div className="input-box12">
                        <input type="text" name="first_name" placeholder="First Name" required onChange={handleChange} />
                    </div>

                    <div className="input-box12">
                        <input type="text" name="last_name" placeholder="Last Name" required onChange={handleChange} />
                    </div>

                    <div className="input-box12">
                        <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
                    </div>

                    <div className="input-box12">
                        <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
                    </div>

                    <div className="input-box12">
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    </div>

                    <div className="input-box12">
                        <input type="password" name="confirmPassword" placeholder="Confirm your Password" required onChange={handleChange} />
                    </div>

                    <div className="remember-forgot12">
                        <label><input type="checkbox" /> Remember me</label>
                    </div>

                    <button type="submit" className="accountbtn">Submit</button>

                    <div className="register-link12">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
