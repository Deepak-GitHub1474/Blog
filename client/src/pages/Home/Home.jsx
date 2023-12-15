import "./Home.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useBlog } from "../../context/BlogContext";
import { BASE_URL } from "../../config/config.js";

import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import {
  FaRegHeart,
  FaRegComment,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [bookMarkBlogs, setBookMarkBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { user } = useBlog();
  const navigate = useNavigate();

  // Get all blogs
  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog`, { withCredentials: true })
      .then((blogs) => {
        setBlogs(blogs.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle DialogueBox
  function toggleDialogueBox(blogId) {
    if (selectedBlog === blogId) {
      setSelectedBlog(null); // If already selected, close dialogue box
    } else {
      setSelectedBlog(blogId); // Open dialogue box for this blog
    }
  }

  // Delete Blog
  function handleDelete(blogId) {
    axios
      .delete(`${BASE_URL}/blog/${blogId}`)
      .then((blog) => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  // Handle like or dislike
  function handleLike(blogId) {
    const likedIndex = likedBlogs.indexOf(blogId);
    if (likedIndex === -1) {
      // Blog not liked, add to likedBlogs
      setLikedBlogs([...likedBlogs, blogId]);
    } else {
      // Blog already liked, remove from likedBlogs
      const updatedLikedBlogs = likedBlogs.filter((id) => id !== blogId);
      setLikedBlogs(updatedLikedBlogs);
    }
  }

  // Handle bookmark
  function handleBookmark(blogId) {
    const bookmarkIndex = bookMarkBlogs.indexOf(blogId);
    if (bookmarkIndex === -1) {
      // Blog not liked, add to likedBlogs
      setBookMarkBlogs([...bookMarkBlogs, blogId]);
    } else {
      // Blog already liked, remove from likedBlogs
      const updatedLikedBlogs = bookMarkBlogs.filter((id) => id !== blogId);
      setBookMarkBlogs(updatedLikedBlogs);
    }
  }

  return (
    <div className={user?.email ? "blogs-container" : ""}>
      {user?.email ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="my-blog"
            onDoubleClick={() => handleLike(blog._id)}
          >
            <div className="username-container">
              <div>
                <span>{blog.username}</span>
                <GoDotFill
                  size="10"
                  className="dot"
                  onClick={() => handleLike(blog._id)}
                />
              </div>
              {blog.email === user.email && <BsThreeDots
                size="32"
                onClick={() => toggleDialogueBox(blog._id)}
                cursor="pointer"
              />}
              {selectedBlog === blog._id && (
                <ul className="edit-delete-container">
                  <Link to={`/updateblog/${blog._id}`} className="Link">
                    <li>Edit</li>
                  </Link>
                  <div className="line"></div>
                  <li onClick={(e) => handleDelete(blog._id)}>Delete</li>
                </ul>
              )}
            </div>
            <div className="blogs-cover-container">
              <img src={blog.file} alt="blog-cover" className="blogs-cover" />
            </div>
            <p className="blog-title">
              <b>{blog.title}</b>
            </p>
            <div className="blog-description">
              <p>{blog.description}</p>
            </div>
            <div className="like-comment-share-save-container">
              <div className="like-comment-share-container">
                {!likedBlogs.includes(blog._id) ? (
                  <FaRegHeart
                    size="28"
                    color="#fff"
                    cursor="pointer"
                    onClick={() => handleLike(blog._id)}
                  />
                ) : (
                  <FaHeart
                    size="28"
                    color="#ff0000"
                    cursor="pointer"
                    onClick={() => handleLike(blog._id)}
                  />
                )}
                <FaRegComment size="28" color="#fff" cursor="pointer" />
                <FiSend size="28" color="#fff" cursor="pointer" />
              </div>
              <div className="save-container">
                {!bookMarkBlogs.includes(blog._id) ? (
                  <FaRegBookmark
                    size="28"
                    color="#fff"
                    cursor="pointer"
                    onClick={() => handleBookmark(blog._id)}
                  />
                ) : (
                  <FaBookmark
                    size="28"
                    color="#f9632d"
                    cursor="pointer"
                    onClick={() => handleBookmark(blog._id)}
                  />
                )}
              </div>
            </div>
            <Link to={`/readblog/${blog._id}`}>
              <button className="read-btn">Read</button>
            </Link>
          </div>
        ))
      ) : (
        <div className="landing-page">
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
        </div>
      )}
    </div>
  );
}

export default Home;
