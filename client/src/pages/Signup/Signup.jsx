import "./Signup.css";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

function Signup() {

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
    });

    const [previewImage, setPreviewImage] = useState("");

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        })
    }

    function handleImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(!uploadedImage) return;
        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })
    }

    return (
        <div className="signup-container">
            <form  className="form-container">
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
                    <label htmlFor="fullName">Name</label>
                    <input 
                        onChange={handleUserInput}
                        value={signupDetails.fullName}
                        required
                        type="text" 
                        name="fullName"
                        className="username"
                        placeholder="enter your username..."
                        id="fullName" />
                </div>
                <div className="inputs-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleUserInput}
                        value={signupDetails.email}
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
                        onChange={handleUserInput}
                        value={signupDetails.password}
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
        </div>
    );
}

export default Signup;