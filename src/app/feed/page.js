// src/app/feed/page.js
'use client'
import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import BlogCard from '../../components/BlogCard'

export default function FeedPage() {
  const { blogs, following } = useApp()

  const feedBlogs = useMemo(() => blogs.filter(b => following.includes(b.authorId)), [blogs, following])

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
      <div className="space-y-4">
        {feedBlogs.length ? feedBlogs.map(b => <BlogCard key={b.id} blog={b} />) : <div className="card">No posts from authors you follow yet.</div>}
      </div>
    </section>
  )
}
