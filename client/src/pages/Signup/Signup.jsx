import axios from "axios";
import "./Signup.css";

import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { BASE_URL } from "../../config/config.js";
import { useBlog } from "../../context/BlogContext.jsx";
import { isEmail, isValidPassword } from "../../helpers/RegExMatch";

function Signup() {

    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [previewImage, setPreviewImage] = useState("");
    const {user} = useBlog();
    const navigate = useNavigate();

    function handleImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(!uploadedImage) return;
        setAvatar(uploadedImage);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username.length < 3) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        if(!isEmail(email)) {
            toast.error("Invalid email provided");
            return;
        }
        if(!isValidPassword(password)) {
            toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character");
            return;
        }

        axios.post(`${BASE_URL}/signup`, { username, email, password })
             .then(res => navigate('/signin'))
             .catch(err => {
                toast.error(err.response.data.msg);
                console.log(err);
             })
    }
    
    return (
        <div className="signup-container">
            {!user.email ?
              <form  className="form-container" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor="image_uploads" className="avatar-label">
                    { previewImage ? (
                        <img className="avatar" src={previewImage}/>
                    ) : (
                        <BsPersonCircle className="avatar" />
                    )}
                </label>
                <input
                    onChange={handleImage}
                    type="file" 
                    className="avatar-input"
                    name="image_uploads"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png, .svg"
                />
                <div className="inputs-container">
                    <label htmlFor="username">Name</label>
                    <input 
                        onChange={e => setUsername(e.target.value)}
                        required
                        type="text" 
                        name="username"
                        className="username"
                        placeholder="enter your username..."
                        id="username" />
                </div>
                <div className="inputs-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        required
                        type="text" 
                        name="email"
                        className="email"
                        placeholder="enter your Email..."
                        id="email" />
                </div>
                <div className="inputs-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        required
                        onChange={e => setPassword(e.target.value)}
                        type="password" 
                        name="password"
                        className="password"
                        placeholder="enter your Password..."
                        id="password" />
                </div>
                <button className="btn">
                    Create account
                </button>
                <p>
                    Already have an account ? <Link to="/signin" className="login-link">Login</Link>
                </p>
              </form>
            :
            <div>
                <Navigate to="/" />
            </div>
            }
        </div>
    );
}

export default Signup;