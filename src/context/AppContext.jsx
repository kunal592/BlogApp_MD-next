'use client'
import React, { createContext, useContext, useState, useMemo } from 'react'
import { blogs as mockBlogs, users as mockUsers, comments as mockComments, notifications as mockNotes } from '../lib/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [blogs, setBlogs] = useState(mockBlogs)
  const [users] = useState(mockUsers)
  const [comments, setComments] = useState(mockComments)
  const [notifications, setNotifications] = useState(mockNotes)
  const [bookmarks, setBookmarks] = useState([]) // array of blog ids
  const [following, setFollowing] = useState(['u2']) // current user follows u2
  const [currentUser, setCurrentUser] = useState(users[0])

  function toggleLike(blogId) {
    setBlogs(prev => prev.map(b => {
      if (b.id !== blogId) return b
      const already = !!b._liked
      return { ...b, likes: already ? b.likes - 1 : b.likes + 1, _liked: !already }
    }))
  }

  function toggleBookmark(blogId) {
    setBookmarks(prev => prev.includes(blogId) ? prev.filter(id => id !== blogId) : [blogId, ...prev])
  }

  function addComment(blogId, text) {
    const newC = { id: 'c' + Date.now(), blogId, authorId: currentUser.id, content: text, createdAt: new Date().toISOString(), likes: 0, replies: [] }
    setComments(prev => [newC, ...prev])
  }

  function toggleFollow(userId) {
    setFollowing(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [userId, ...prev])
  }

  function markAllNotificationsRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function addReply(commentId, text) {
    const newReply = { id: 'r' + Date.now(), authorId: currentUser.id, content: text, createdAt: new Date().toISOString() };
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, replies: [newReply, ...(c.replies || [])] };
      }
      return c;
    }));
  }

  function likeComment(commentId) {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: (c.likes || 0) + 1 };
      }
      return c;
    }));
  }

  function deleteBlog(blogId) {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
    setComments(prev => prev.filter(c => c.blogId !== blogId));
  }

  const value = useMemo(() => ({
    blogs, users, comments, notifications, currentUser, bookmarks, following,
    toggleLike, toggleBookmark, addComment, toggleFollow, markAllNotificationsRead, setBlogs,
    addReply, likeComment, deleteBlog
  }), [blogs, users, comments, notifications, currentUser, bookmarks, following])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
