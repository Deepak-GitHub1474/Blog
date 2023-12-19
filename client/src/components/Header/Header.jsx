import "./Header.css";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL } from "../../config/config.js";
import { useBlog } from '../../context/BlogContext';

import {FaCaretDown, FaCaretUp, FaHome } from "react-icons/fa";
import { MdAddTask, MdLibraryAdd } from "react-icons/md";

export default function Navbar() {
    const { user } = useBlog();
    const [width, setWidth] = useState(window.innerWidth);

    const handleLogout = () => {
        axios.get(`${BASE_URL}/logout`)
            .then(res => {
                if (res.data.msg === "Success")
                    window.location.href = "/signin";
            }).catch(err => console.log(err))
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    // Track Window Width
    useEffect(() => {
        function trackWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", trackWidth);

        return () => {
            window.removeEventListener("resize", trackWidth);
        }
    }, []);

    return (
        <div className="navbar-container">
            
            {user.email &&
                <nav className="header-container">
                    {width > 768 ? 
                        <li><Link to="/" className="header-link">Home</Link></li> : 
                        <Link to="/" className="home-link"><FaHome size="32" color="#fff"/></Link>
                    }
                    {width <= 768 && <span className="home-popup">Home</span>}
                    {width > 768 ? 
                        <li><Link to="addBlog" className="header-link">Add Blog</Link></li> : 
                        <Link to="addBlog" className="add-blog-link"><MdAddTask size="32" color="#fff"/></Link>
                    }
                    {width <= 768 && <span className="add-blog-popup">Add Blog</span>}
                    {width > 768 ? 
                        <li><Link to="/myblog" className="header-link">My Blog</Link></li> : 
                        <Link to="/myblog" className="my-blog-link"><MdLibraryAdd size="32" color="#fff"/></Link>
                    }
                    {width <= 768 && <span className="my-blog-popup">My Blog</span>}
                    <div className="dropdown-container-wrapper">
                        <div className="dropdown-container" onClick={toggleDropdown}>
                            <div className="avatar-container">
                                <img
                                    src={!user.avatar ? "https://res.cloudinary.com/dlt4ash36/image/upload/v1700893730/User-Avatar-Profile-Download-PNG-Isolated-Image_mrgemq.png": user.avatar}
                                    alt="dp" className="profile-image" />
                            </div>
                            {width > 290 && <p className="profile-name">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>}
                            {isDropdownVisible ? <FaCaretUp size="22" /> : <FaCaretDown size="22" />}
                            {isDropdownVisible &&
                                <ul className="dropdown-inner">
                                    <li>Profile</li>
                                    <div className="line"></div>
                                    <li id="log-out" onClick={handleLogout}>Log Out</li>
                                </ul>
                            }
                        </div>
                    </div>
                </nav>
            }
        </div>
    );
}