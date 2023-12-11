import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config.js";

// Create a context
const BlogContext = createContext();

// Custom hook to use the blog context
export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {

  const [user, setUser] = useState({
    username: null,
    email: null
})

  axios.defaults.withCredentials = true; // Global Credential

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("base url",response.data);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchUser();
  }, []);
  

  return (
    <BlogContext.Provider value={{ user }} >
      {children}
    </BlogContext.Provider>
  );
}