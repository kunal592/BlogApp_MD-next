'use client'
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { api } from '@/lib/axios'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, usersRes] = await Promise.all([
          api.get('/blogs'),
          api.get('/users'),
        ])
        setBlogs(blogsRes.data)
        setUsers(usersRes.data)
      } catch (error) {
        console.error("Error fetching initial data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function login(email, password) {
    try {
      const res = await api.post('/auth/login', { email, password })
      setCurrentUser(res.data.user)
      // You might want to store the token in localStorage and set it in axios headers
    } catch (error) {
      console.error("Error logging in:", error)
      throw error
    }
  }

  async function logout() {
    // You might want to remove the token from localStorage and axios headers
    setCurrentUser(null)
  }

  async function fetchComments(blogId) {
    try {
      const res = await api.get(`/comments?blogId=${blogId}`)
      setComments(res.data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  async function toggleLike(blogId) {}

  async function toggleBookmark(blogId) {}

  async function addComment(blogId, content) {
    try {
      const res = await api.post('/comments', { blogId, content })
      setComments(prev => [res.data, ...prev])
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  async function toggleFollow(userId) {}

  async function markAllNotificationsRead() {}

  async function addReply(commentId, text) {}

  async function likeComment(commentId) {}

  async function deleteBlog(blogId) {
    try {
      await api.delete(`/blogs/${blogId}`)
      setBlogs(prev => prev.filter(b => b.id !== blogId))
    } catch (error) {
      console.error("Error deleting blog:", error)
    }
  }

  async function updateUserProfile(userId, newProfileData) {
    try {
      const res = await api.put(`/users/${userId}`, newProfileData)
      setUsers(prev => prev.map(u => u.id === userId ? res.data : u))
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  }

  async function updateBlog(blogId, newBlogData) {
    try {
      const res = await api.put(`/blogs/${blogId}`, newBlogData)
      setBlogs(prev => prev.map(b => b.id === blogId ? res.data : b))
    } catch (error) {
      console.error("Error updating blog:", error)
    }
  }

  async function signup(name, email, password) {
    try {
      const res = await api.post('/users', { name, email, password })
      setUsers(prev => [res.data, ...prev])
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const value = useMemo(() => ({
    blogs, users, comments, notifications, bookmarks, following, loading, currentUser,
    fetchComments, toggleLike, toggleBookmark, addComment, toggleFollow, 
    markAllNotificationsRead, addReply, likeComment, deleteBlog, 
    updateUserProfile, updateBlog, setBlogs, signup, login, logout
  }), [blogs, users, comments, notifications, bookmarks, following, loading, currentUser])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
