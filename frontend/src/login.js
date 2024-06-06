import React from "react";
import axios from 'axios'

function Login ({ onLogin}) {
    const [formData, setFormData] = useState({email:'',password:''})
    const handleChange = (e) => {
        setFormData ({ ...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:4000/auth/login`, formData)
            if (response.data.userId){
                const userResponse = await axios.get(`http://localhost:4000/user/getprofile/${response.data.userId}`)
                onLogin(userResponse.data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onchange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onchange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;
