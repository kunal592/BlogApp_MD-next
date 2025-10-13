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

  useEffect(() => {
    // Fetch initial data
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

  async function fetchComments(blogId) {
    try {
      const res = await api.get(`/comments?blogId=${blogId}`)
      setComments(res.data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  async function toggleLike(blogId) {
    // This is a placeholder, as we don't have a like endpoint
  }

  async function toggleBookmark(blogId) {
    // This is a placeholder, as we don't have a bookmark endpoint
  }

  async function addComment(blogId, content) {
    try {
      const res = await api.post('/comments', { blogId, content })
      setComments(prev => [res.data, ...prev])
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  async function toggleFollow(userId) {
    // This is a placeholder, as we don't have a follow endpoint
  }

  async function markAllNotificationsRead() {
    // This is a placeholder, as we don't have a notification endpoint
  }

  async function addReply(commentId, text) {
    // This is a placeholder, as we don't have a reply endpoint
  }

  async function likeComment(commentId) {
    // This is a placeholder, as we don't have a like endpoint
  }

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
    blogs, users, comments, notifications, bookmarks, following, loading,
    fetchComments, toggleLike, toggleBookmark, addComment, toggleFollow, 
    markAllNotificationsRead, addReply, likeComment, deleteBlog, 
    updateUserProfile, updateBlog, setBlogs, signup
  }), [blogs, users, comments, notifications, bookmarks, following, loading])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
