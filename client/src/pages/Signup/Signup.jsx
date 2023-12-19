import "./Signup.css";

import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { BASE_URL } from "../../config/config.js";
import { useBlog } from "../../context/BlogContext.jsx";
import { isEmail, isValidPassword } from "../../helpers/RegExMatch";

function Signup() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [previewImage, setPreviewImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useBlog(); // getting user's email and username
  const navigate = useNavigate();

  // Converting image base64
  const convertImgBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject("Error while convertImgBase64", error);
      };
    });
  };

  // getting avatar's cloudinary url
  function uploadAvatar(base64) {
    setLoading(true);
    axios
      .post(`${BASE_URL}/uploadImage`, { image: base64 })
      .then((res) => {
        setAvatar(res.data);
        handleAvatarPreview();
        toast.success("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch("catch uploadAvatar", console.log);
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    const base64 = await convertImgBase64(files[0]);
    uploadAvatar(base64);
    return;
  };

  // Preview uploading avatar
  function handleAvatarPreview() {
    setPreviewImage(true)
  }

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Upload the profile image!");
      return;
    }

    if (username.length < 3) {
      toast.error("Name should be atleast of 3 characters");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Invalid email provided");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error(
        "Invalid password provided, password should 6-16 character long with atleast a number and a special character"
      );
      return;
    }

    axios
      .post(`${BASE_URL}/signup`, { avatar, username, email, password })
      .then((res) => {
        console.log(res);
        toast.success("Successfully sign up");
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      {!user.email ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="image_uploads" className="avatar-label">
            {previewImage ? (
              <img className="avatar" src={avatar} />
            ) : (
              <>
                {loading ? (
                  <AiOutlineLoading3Quarters className="loading-icon" />
                ) : (
                  <BsPersonCircle className="avatar" />
                )}
              </>
            )}
          </label>
          <input
            onChange={uploadImage}
            type="file"
            className="avatar-input"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />
          <div className="inputs-container">
            <label htmlFor="username">Name</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              className="username"
              placeholder="enter your username..."
              id="username"
            />
          </div>
          <div className="inputs-container">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="password"
              placeholder="enter your Password..."
              id="password"
            />
          </div>
          <button className="btn">Create account</button>
          <p>
            Already have an account ?
            <Link to="/signin" className="login-link">
              Login
            </Link>
          </p>
        </form>
      ) : (
        <div>
          <Navigate to="/" />
        </div>
      )}
    </div>
  );
}

export default Signup;
