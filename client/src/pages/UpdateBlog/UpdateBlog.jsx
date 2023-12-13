import "./UpdateBlog.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../config/config.js";

function UpdateBlog() {

    const [input, setInput] = useState({
        title: "",
        file: "",
        description: "",
        blog: ""
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.patch(`${BASE_URL}/blog/${id}`, {
            title: input.title,
            file: input.file,
            description: input.description,
            blog: input.blog
        })
            .then(res => {
                if (res.data === "Success") {
                    navigate("/")
                }
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/blog/${id}`)
            .then(result => {
                setInput({
                    title: result.data.title,
                    file: result.data.file,
                    description: result.data.description,
                    blog: result.data.blog
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="update-blog-container-wrapper">
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
                    <Link to={`/readblog/${id}`}><button className="read-btn">Read</button></Link>
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
                    className="blog"
                    placeholder="Type Your Blog"
                    value={input.blog}
                    onChange={handleInputChange}
                ></textarea>

                <button className="update-blog-btn">Update</button>
                <button className="close-blog-btn">Close</button>
            </form>
        </div>
    )
}

export default  UpdateBlog;