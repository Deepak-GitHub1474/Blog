import { createContext, useContext, useState } from "react";

// Create a context
const BlogContext = createContext();

// Custom hook to use the blog context
export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {

  const [user, setUser] = useState({
    username: null,
    email: null,
  });

  return (
    <BlogContext.Provider value={{ user }} >
      {children}
    </BlogContext.Provider>
  );
}
