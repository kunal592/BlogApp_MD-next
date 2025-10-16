
# Endpoints Overview

This document provides a comprehensive overview of all the frontend and backend routes in the application.

## Frontend Routes (Pages)

*   `/`: The home page, which displays a list of all the blogs.
*   `/about`: The about page for the project.
*   `/admin`: The admin dashboard to manage the page.
*   `/bookmarks`: A page for viewing a user's bookmarked blog posts.
*   `/contact`: A page for contacting the site administrators.
*   `/dashboard`: A personalized dashboard for authenticated users.
*   `/edit/[id]`: A page for editing an existing blog post.
*   `/feed`: A personalized feed of blog posts for authenticated users.
*   `/login`: The user login page.
*   `/notifications`: A page for viewing user notifications.
*   `/postblog`: A page for creating a new blog post.
*   `/profile`: A user's public profile page.
*   `/profile/[id]`: A page for viewing a specific user's profile.
*   `/signup`: The user signup page.
*   `/unauthorized`: A page displayed when a user is not authorized to access a resource.

## Backend API Endpoints

### AI

*   `POST /api/ai/rewrite`: Rewrites a given text using AI.
*   `POST /api/ai/seo-optimize`: Optimizes a blog post for SEO using AI.
*   `POST /api/summarize`: Summarizes a blog post using AI.

### Auth

*   `POST /api/auth/[...nextauth]`: Handles all NextAuth.js authentication routes (e.g., login, logout, session management).
*   `POST /api/register`: Registers a new user.

### Blogs

*   `GET /api/blogs`: Retrieves all blog posts.
*   `POST /api/blogs`: Creates a new blog post.
*   `GET /api/blogs/[id]`: Retrieves a single blog post by its ID.
*   `PUT /api/blogs/[id]`: Updates an existing blog post.
*   `DELETE /api/blogs/[id]`: Deletes a blog post.
*   `POST /api/blogs/[id]/bookmark`: Bookmarks a blog post.
*   `GET /api/blogs/[id]/like`: Likes a blog post.
*   `POST /api/blogs/[id]/publish`: Publishes a draft blog post.
*   `GET /api/blogs/user/[id]`: Retrieves all blog posts for a specific user.

### Bookmarks

*   `GET /api/bookmarks/isBookmarked`: Checks if a blog post is bookmarked by the current user.

### Claps

*   `POST /api/claps`: Adds a "clap" (like) to a blog post.

### Comments

*   `GET /api/comments?blogId=[blogId]`: Retrieves all comments for a specific blog post.
*   `POST /api/comments`: Creates a new comment.
*   `DELETE /api/comments/[id]`: Deletes a comment.
*   `POST /api/comments/[id]/like`: Likes a comment.
*   `GET /api/comments/[id]/replies`: Retrieves all replies for a specific comment.
*   `POST /api/comments/[id]/report`: Reports a comment.

### Contact

*   `POST /api/contact`: Submits a contact form entry.
*   `GET /api/contact/[id]`: Retrieves a specific contact form entry.

### Follow

*   `POST /api/follow`: Toggles the follow state for a user.
*   `GET /api/follow/isFollowing`: Checks if the current user is following a specific user.

### Notifications

*   `GET /api/notifications`: Retrieves all notifications for the current user.
*   `GET /api/notifications/unread-count`: Retrieves the number of unread notifications for the current user.
*   `DELETE /api/notifications/[id]`: Deletes a notification.

### Team

*   `GET /api/team`: Retrieves all team members.
*   `GET /api/team/[id]`: Retrieves a specific team member.

### Users

*   `GET /api/users`: Retrieves all users.
*   `POST /api/users`: Creates a new user.
*   `GET /api/users/[id]`: Retrieves a specific user.
*   `POST /api/users/[id]/follow`: Toggles the follow state for a user.
*   `GET /api/users/me`: Retrieves the profile of the currently authenticated user.
*   `GET /api/users/me/following`: Retrieves the list of users the current user is following.
