# API Documentation for DevDoc's

This document outlines the API endpoints required to power the DevDoc's frontend. The backend should be built to support these endpoints to replace the current mock data system.

## Base URL

All API endpoints are prefixed with `/api`.
The development server is expected to run on `http://localhost:5003`, so the full base URL is `http://localhost:5003/api`.

---

## Authentication

Authentication is handled via session management, with Google OAuth as a primary sign-in method.

### 1. Get Current User Session

- **Endpoint:** `GET /auth/session`
- **Description:** Retrieves the profile of the currently authenticated user.
- **Response Body:**
  ```json
  {
    "id": "u1",
    "name": "John Doe",
    "avatar": "https://i.pravatar.cc/150?u=u1",
    "bio": "Frontend developer and tech blogger.",
    "followers": 150,
    "following": 75
  }
  ```

### 2. Google OAuth Login

- **Endpoint:** `GET /auth/google`
- **Description:** Initiates the Google OAuth 2.0 authentication flow. The user is redirected to Google's sign-in page.

### 3. Google OAuth Callback

- **Endpoint:** `GET /auth/google/callback`
- **Description:** The callback URL that Google redirects to after successful authentication. The backend should handle the code exchange and create a user session.

### 4. Logout

- **Endpoint:** `POST /auth/logout`
- **Description:** Clears the user's session.

---

## Users

Endpoints for managing user profiles and interactions.

### 1. Get All Users

- **Endpoint:** `GET /users`
- **Description:** Retrieves a list of all users.
- **Response Body:**
  ```json
  [
    {
      "id": "u1",
      "name": "John Doe",
      "avatar": "https://i.pravatar.cc/150?u=u1"
    },
    ...
  ]
  ```

### 2. Get User by ID

- **Endpoint:** `GET /users/:id`
- **Description:** Retrieves the public profile of a specific user.
- **Response Body:**
  ```json
  {
    "id": "u2",
    "name": "Jane Smith",
    "avatar": "https://i.pravatar.cc/150?u=u2",
    "bio": "Full-stack developer and open-source contributor.",
    "followers": 200,
    "following": 100
  }
  ```

### 3. Update Current User Profile

- **Endpoint:** `PUT /me`
- **Description:** Updates the profile of the currently authenticated user.
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated",
    "bio": "Senior frontend developer.",
    "avatar": "https://new-avatar.com/img.png",
    "followers": 155,
    "following": 80
  }
  ```

### 4. Toggle Follow

- **Endpoint:** `POST /users/:id/follow`
- **Description:** Follows or unfollows a user. The backend should toggle the follow state.

---

## Blogs

Endpoints for managing blog posts.

### 1. Get All Blogs

- **Endpoint:** `GET /blogs`
- **Description:** Retrieves a list of all blog posts.

### 2. Get Blog by ID

- **Endpoint:** `GET /blogs/:id`
- **Description:** Retrieves a single blog post by its ID.

### 3. Create Blog

- **Endpoint:** `POST /blogs`
- **Description:** Creates a new blog post.
- **Request Body:**
  ```json
  {
    "title": "New Blog Title",
    "excerpt": "A short summary of the blog.",
    "content": "The full content of the blog post.",
    "image": "https://example.com/image.png"
  }
  ```

### 4. Update Blog

- **Endpoint:** `PUT /blogs/:id`
- **Description:** Updates an existing blog post.
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "excerpt": "Updated summary.",
    "image": "https://example.com/new-image.png"
  }
  ```

### 5. Delete Blog

- **Endpoint:** `DELETE /blogs/:id`
- **Description:** Deletes a blog post.

### 6. Toggle Like

- **Endpoint:** `POST /blogs/:id/like`
- **Description:** Likes or unlikes a blog post. The backend should toggle the like state.

### 7. Toggle Bookmark

- **Endpoint:** `POST /blogs/:id/bookmark`
- **Description:** Bookmarks or unbookmarks a blog post for the current user.

---

## Comments

Endpoints for managing comments and replies.

### 1. Get Comments for a Blog

- **Endpoint:** `GET /blogs/:id/comments`
- **Description:** Retrieves all comments for a specific blog post.

### 2. Add Comment

- **Endpoint:** `POST /blogs/:id/comments`
- **Description:** Adds a new comment to a blog post.
- **Request Body:**
  ```json
  {
    "text": "This is a great article!"
  }
  ```

### 3. Like Comment

- **Endpoint:** `POST /comments/:id/like`
- **Description:** Likes a comment.

### 4. Add Reply to Comment

- **Endpoint:** `POST /comments/:id/replies`
- **Description:** Adds a reply to a specific comment.
- **Request Body:**
  ```json
  {
    "text": "I agree!"
  }
  ```

---

## Notifications

Endpoints for managing user notifications.

### 1. Get Notifications

- **Endpoint:** `GET /notifications`
- **Description:** Retrieves all notifications for the currently authenticated user.

### 2. Mark Notifications as Read

- **Endpoint:** `POST /notifications/mark-read`
- **Description:** Marks all of the user's unread notifications as read.

---

## Miscellaneous

### 1. Contact Form

- **Endpoint:** `POST /contact`
- **Description:** Handles submissions from the contact form.
- **Request Body:**
  ```json
  {
    "name": "Visitor",
    "email": "visitor@example.com",
    "message": "Hello, I have a question."
  }
  ```
