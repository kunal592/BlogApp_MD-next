
# Endpoints Overview

## Frontend Routes (Pages)

*   `/`: The home page, which displays a list of all the blogs.
*   `/feed`: A personalized feed of blog posts for authenticated users.
*   `/profile`: A user's public profile page.
*   `/login`: The user login page.
*   `/signup`: The user signup page.
*   `/blogs/create`: A page for creating a new blog post.
*   `/blogs/:id`: A page for viewing a single blog post.
*   `/blogs/:id/edit`: A page for editing an existing blog post.
*   `/about`: The about page for the project
*   `/admin`: The admin dashboard to manage the page

## Backend API Endpoints

*   `GET /api/blogs`: Retrieves all blog posts.
*   `POST /api/blogs`: Creates a new blog post.
*   `GET /api/blogs/:id`: Retrieves a single blog post by its ID.
*   `PUT /api/blogs/:id`: Updates an existing blog post.
*   `DELETE /api/blogs/:id`: Deletes a blog post.
*   `POST /api/blogs/:id/like`: Likes a blog post.
*   `POST /api/blogs/:id/bookmark`: Bookmarks a blog post.
*   `GET /api/comments?blogId=:blogId`: Retrieves all comments for a specific blog post.
*   `POST /api/comments`: Creates a new comment.
*   `PUT /api/comments/:id`: Updates a comment.
*   `DELETE /api/comments/:id`: Deletes a comment.
*   `GET /api/users`: Retreives all the users.
*   `POST /api/users`: Creates a new user.
*   `GET /api/users/me`: Retrieves the profile of the currently authenticated user.
*   `PUT /api/users/me`: Updates the profile of the currently authenticated user.
*   `GET /api/users/:id`: Retrieves the profile of a specific user.
*   `PUT /api/users/:id`: Updates an existing user.
*   `DELETE /api/users/:id`: Deletes a user.
*   `POST /api/users/:id/follow`: Toggles the follow state for a user.
*   `POST /api/register`: Registers a new user.
