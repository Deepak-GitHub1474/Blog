import "./AddBlog.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useBlog } from "../../context/BlogContext";
import { BASE_URL } from "../../config/config.js";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useBlog();
  const navigate = useNavigate();

  // Adding new blog to database
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title: title,
      file: file,
      description: description,
      blog: blog,
      email: user.email,
      username: user.username,
    };

    axios
      .post(`${BASE_URL}/addBlog`, blogData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  // Loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="add-blog-container">
      {user.email ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Write Your Blog</h1>
          <input
            type="text"
            name="blog-title"
            placeholder="Enter Title of Your Story"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="blog-title-input"
          />
          <input
            type="url"
            name="file"
            placeholder="Enter URL of Blog Image"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
          <input
            type="text"
            name="blog-description"
            placeholder="Type Short Description for Your Blog"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            name="story"
            className="story"
            rows="40"
            placeholder="Type Your Blog"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
          ></textarea>
          <button className="publish-blog-btn">Publish Blog</button>
        </form>
      ) : (
        <div className="landing-page">
          {isLoading ? 
          <div className="loader-container">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" />
          </div>
          :
            <>
              <div className="landing-page-cover-container"></div>
            <div onClick={() => navigate("/signin")}>
              <button className="landing-page-btn">Login</button>
            </div>
            <div className="landing-page-content-container">
              <h1>Welcome to your professional community blog...</h1>
              <h2>Login to explore...</h2>
              <img
                src="https://res.cloudinary.com/dlt4ash36/image/upload/v1701709205/1031604_Featured-image-WP-Recipe-Maker_Op1_040821-1_x94dx6.png"
                alt="landing-page-cover"
              />
            </div>
            </>
            }
        </div>
      )}
    </div>
  );
}

export default AddBlog;
