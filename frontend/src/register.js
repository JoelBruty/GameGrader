import React from "react";
import axios from 'axios'
import { useState } from "react";

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' })



    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            console.error("Passwords do not match")
        }

        try {
            const response = await axios.post('http://localhost:4000/auth/register', {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password
            });
            if (response.data.userId) { //if  a new userId was created 
                const userResponse = await axios.get(`http://localhost:4000/user/getprofile/${response.data.userId}`) //get their data
                onRegister(userResponse.data) //pass the newly registered data to Register 
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="username" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Re-enter password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Register