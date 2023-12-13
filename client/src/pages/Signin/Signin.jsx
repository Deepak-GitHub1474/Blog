import "./Signin.css";

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

import {BASE_URL} from "../../config/config.js";
import { useBlog } from '../../context/BlogContext';

function Signin() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { user } = useBlog();
    
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/signin`, { email, password })
            .then(res => {
                if (res.data.msg === "Success") {
                    window.location.href = "/";
                }
            })
            .catch(err => {
                toast.error(err.response.data.msg);
                console.log(err);
            })
    }

    return (
        <div className="signin-container">
            {!user.email ?<form onSubmit={handleSubmit} className="form-container">
                <h1>Login Page</h1>
                
                <div className="inputs-container">
                    <label htmlFor="email" className="email-label">Email</label>
                    <input 
                        required
                        type="text" 
                        name="email"
                        className="email"
                        placeholder="enter your Email..."
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="inputs-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        required
                        type="password" 
                        name="password"
                        className="password"
                        placeholder="enter your Password..."
                        id="password" 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn">
                    Sign In
                </button>
                <p className="text-center">
                    Don't have an account ? <Link to="/signup" className="sigin-link">Sign Up</Link>
                </p>
            </form>
            :
            <Navigate to="/" />}
        </div>
    );
}

export default Signin;
