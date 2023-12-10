import "./Signin.css";

import { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {

    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: '',
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSigninDetails({
            ...signinDetails,
            [name]: value
        })
    }

    return (
        <div className="signin-container">
            <form className="form-container">
                <h1>Login Page</h1>
                
                <div className="inputs-container">
                    <label htmlFor="email" className="email-label">Email</label>
                    <input 
                        onChange={handleUserInput}
                        value={signinDetails.email}
                        required
                        type="text" 
                        name="email"
                        className="email"
                        placeholder="enter your Email..."
                        id="email" 
                    />
                </div>
                <div className="inputs-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        required
                        onChange={handleUserInput}
                        value={signinDetails.password}
                        type="password" 
                        name="password"
                        className="password"
                        placeholder="enter your Password..."
                        id="password" 
                    />
                </div>
                <button className="btn">
                    Sign In
                </button>
                <p className="text-center">
                    Don't have an account ? <Link to="/signup" className="sigin-link">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Signin;
