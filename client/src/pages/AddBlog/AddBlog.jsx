import "./AddBlog.css";

import React, { useState } from "react";
import axios from "axios";
import { useBlog } from '../../context/BlogContext';
import {BASE_URL} from "../../config/config.js";

 function AddBlog() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const [blog, setBlog] = useState("");

    const { user } = useBlog();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = {
            title: title,
            file: file,
            description: description,
            blog: blog,
            email: user.email,
            username: user.username
        };

        axios.post(`${BASE_URL}/addBlog`, blogData)
            .then(res => {
                if (res.data === "Success") {
                    window.location.href = "/";
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="add-blog-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Write Your Blog</h1>
                <input
                    type="text"
                    name="blog-title"
                    placeholder="Enter Title of Your Story"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="blog-title-input"
                />
                <input
                    type="url"
                    name="file"
                    placeholder="Enter URL of Blog Image"
                    value={file}
                    onChange={e => setFile(e.target.value)}
                />
                <input
                    type="text"
                    name="blog-description"
                    placeholder="Type Short Description for Your Blog"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <textarea
                    name="story"
                    className="story"
                    rows="40"
                    placeholder="Type Your Blog"
                    value={blog}
                    onChange={e => setBlog(e.target.value)}
                >
                </textarea>
                <button className="publish-blog-btn">Publish Blog</button>
            </form>
        </div>
    );
}

export default AddBlog;