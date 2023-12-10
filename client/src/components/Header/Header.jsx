import "./Header.css";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL } from "../../config/config.js";

import {FaCaretDown, FaCaretUp, FaHome } from "react-icons/fa";
import { MdAddTask, MdLibraryAdd } from "react-icons/md";

export default function Navbar() {

    const [width, setWidth] = useState(window.innerWidth);

    const handleLogout = () => {
        axios.get(`${BASE_URL}/logout`)
            .then(res => {
                if (res.data === "Success")
                    window.location.href = "/user/login";
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
            <nav className="header-container">
                {width > 768 ? 
                    <li><Link to="/" className="header-link">Home</Link></li> : 
                    <Link to="/" className="home-link"><FaHome className="header-icon"/></Link>
                }
                {width <= 768 && <span className="home-popup">Home</span>}
                {width > 768 ? 
                    <li><Link to="/" className="header-link">Add Blog</Link></li> : // Todo fix route
                    <Link to="/" className="add-blog-link"><MdAddTask className="header-icon"/></Link>
                }
                {width <= 768 && <span className="add-blog-popup">Add Blog</span>}
                {width > 768 ? 
                    <li><Link to="/" className="header-link">My Blog</Link></li> : 
                    <Link to="/" className="my-blog-link"><MdLibraryAdd className="header-icon"/></Link>
                }
                {width <= 768 && <span className="my-blog-popup">My Blog</span>}
                <div className="dropdown-container-wrapper">
                    <div className="dropdown-container" onClick={toggleDropdown}>
                        <div className="avatar-container">
                            <img
                                src="https://res.cloudinary.com/dlt4ash36/image/upload/v1700893730/User-Avatar-Profile-Download-PNG-Isolated-Image_mrgemq.png"
                                alt="dp" className="profile-image" />
                        </div>
                        {width > 290 && <p className="profile-name">Deepak</p>}
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
        </div>
    );
}