## Authenticated Routes
- POST /api/blogs (Create Blog)
- PUT /api/blogs/:id (Update Blog)
- DELETE /api/blogs/:id (Delete Blog)
- POST /api/blogs/:id/like (Like Blog)
- POST /api/blogs/:id/bookmark (Bookmark Blog)
- POST /api/users/:id/follow (Follow/Unfollow User)
- GET /api/users/me (Get Current User)

Access: Only logged-in users
Auth: NextAuth (Google)