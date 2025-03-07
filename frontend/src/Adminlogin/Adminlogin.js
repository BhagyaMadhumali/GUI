import React, { useState } from "react";
import "./Adminlogin.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
               
                localStorage.setItem("adminToken", data.token);
                navigate("/adminheader"); 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Error logging in");
        }
    };

    return (
        <div className="adminbackgroundpart">
            <img src="/image.png" alt="Background" className="adminimage" />
            <div className="wrapperadmin">
                <form onSubmit={handleSubmit}>
                    <h1>ADM<span>IN </span> LOG<span>IN</span></h1>
                    <div className="input-box13">
                        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
                    </div>
                    <div className="input-box13">
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    </div>
                    <button type="Submit" className="adminbtn">Login</button>
                </form>
            </div>
        </div>
    );
}
