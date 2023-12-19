import "./UpdateBlog.css";

import { IoIosCloseCircle } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useBlog } from "../../context/BlogContext";
import { BASE_URL } from "../../config/config.js";

function UpdateBlog() {
  const [input, setInput] = useState({
    title: "",
    file: "",
    description: "",
    blog: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useBlog();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`${BASE_URL}/blog/${id}`, {
        title: input.title,
        file: input.file,
        description: input.description,
        blog: input.blog,
      })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/${id}`)
      .then((result) => {
        setInput({
          title: result.data.title,
          file: result.data.file,
          description: result.data.description,
          blog: result.data.blog,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="update-blog-container-wrapper">
      {user.email ? (
        <>
          <div className="update-blog-container">
            <div className="my-blog">
              <div className="blogs-cover-container">
                <img src={input.file} alt="" className="blogs-cover" />
              </div>
              <p className="blog-title">
                <b>{input.title}</b>
              </p>
              <div className="blog-description">
                <p>{input.description}</p>
              </div>
              <Link to={`/readblog/${id}`}>
                <button className="read-btn">Read</button>
              </Link>
            </div>
          </div>
          <form className="update-form-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input.title}
              name="title"
              placeholder="Enter Title of Your Story"
              onChange={handleInputChange}
            />
            <input
              type="url"
              value={input.file}
              name="file"
              placeholder="Enter Url of Blog Image"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Type Short Description for Your Blog"
              value={input.description}
              onChange={handleInputChange}
            />
            <textarea
              name="blog"
              placeholder="Type Your Blog"
              value={input.blog}
              onChange={handleInputChange}
            ></textarea>

            <button className="update-blog-btn">Update</button>
            <IoIosCloseCircle
              className="close-blog-btn"
              onClick={() => navigate("/")}
            />
          </form>
        </>
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

export default UpdateBlog;
