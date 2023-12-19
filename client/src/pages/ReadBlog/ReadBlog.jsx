import "./ReadBlog.css";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../config/config.js";
import { useBlog } from "../../context/BlogContext.jsx";

function ReadBlog() {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { blogID } = useParams();
  const { user } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/${blogID}`)
      .then((blog) => setBlog(blog.data))
      .catch((err) => console.log(err));
  }, [blogID]);

  // Loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="read-blog-container-wrapper">
      {user.email ? (
        <div className="read-blog-container">
          <div className="read-blog-title-description">
            <h1>
              {" "}
              <b>{blog.title}</b>
            </h1>
            <p>{blog.blog}</p>
          </div>
          <div className="read-blogs-cover-container">
            <img src={blog.file} alt="" className="read-blogs-cover" />
          </div>
        </div>
      ) : (
        <div className="landing-page">
          {isLoading ? (
            <div className="loader-container">
              <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" />
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default ReadBlog;
