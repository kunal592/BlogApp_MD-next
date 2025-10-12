// src/components/DashboardStats.jsx
'use client'
import { useApp } from '../context/AppContext'

export default function DashboardStats() {
  const { users, blogs, comments } = useApp()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card">
        <div className="text-sm text-slate-500">Users</div>
        <div className="text-2xl font-bold">{users.length}</div>
      </div>
      <div className="card">
        <div className="text-sm text-slate-500">Blogs</div>
        <div className="text-2xl font-bold">{blogs.length}</div>
      </div>
      <div className="card">
        <div className="text-sm text-slate-500">Comments</div>
        <div className="text-2xl font-bold">{comments.length}</div>
      </div>
      <div className="card">
        <div className="text-sm text-slate-500">Likes (sum)</div>
        <div className="text-2xl font-bold">{blogs.reduce((s,b) => s + (b.likes||0), 0)}</div>
      </div>
    </div>
  )
}
