## ......... Blog App .........

## Description

  This is a blog app which has many functionality like adding your own blogs,
  editing, deleting, and reading full blogs. Also users can watch public 
  blogs too.to mange blogs user authorization is require to perform CRUD operation, 
  which makes your blog secure.

## Use

- To use the application, users needs to register first by filling all the input fields.
- After successfully register user can use their email and password to login.
- As soon as user login, user will land on home page of blogs.
- Now user will have access to add their blog, later can edit or delete their blogs.
- There is My Blog navigation which will show only their blogs.
- There is dedicated edit page where use can update their blog.
- Easy to log out by just click on Logout button.

## Features:

- User Sign up.
- User Sign in.
- User authorization and authentication.
- Create blog and post so that other user can read.
- Read individual full blog on seperate page.
- Update/Edit own blog.
- Delete own blogs.
- Likes, Comments, and save the blog [under implemention].
- Responsive to adopt all screen size.
- State management.
- Toaster.

## API Endpoints

- **POST /signup**: Register a new user.
- **POST /signin**: Log in an existing user.
- **GET /logout**: Log out the user.
- **GET /**: Get all blogs.
- **POST /addBlog**: Add a new blog.
- **GET /blog/:blogID**: Get a blog by ID.
- **PATCH /blog/:id**: Update a blog.
- **DELETE /blog/:id**: Delete a blog.

## Error Handling

  In case of an error, the API will respond with an appropriate HTTP status code and an error
  message in the response body.

## Common HTTP Status Codes:

- 200 OK: The request was successful.
- 400 Bad Request: The request was invalid or could not be processed.
- 401 Unauthorized: Authentication failed or user is not authorized.
- 404 Not Found: The requested resource could not be found.
- 501 Not Implemented: The requested feature or functionality is not yet implemented.
  How to Run.
- Make sure you have Node.js and MongoDB installed on your system.
- Clone the repository and navigate to the root folder in your terminal.
- Create a .env file in the root folder and set the following environment variables:

  PORT=7000 # Set the port number for the server
  MONGO_URI=your_mongo_db_connection_string # Set the MongoDB connection string

## Install the dependencies mentioned below:

- Express.js: A web application framework for Node.js.
- Mongoose: A MongoDB ODM library for Node.js.
- Cors: A middleware for enabling CORS (Cross-Origin Resource Sharing).
- Dotenv: A module for loading environment variables from a .env file.
- Nodemon: A utility that helps in development by automatically restarting the server on code
  changes. (Development Dependency).

## Backend Language/Library/Framework and Dependencies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jwt
- nodemon
- cookie-parser
- jsonwebtoken
- cors
- dotenv
