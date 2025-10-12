// src/app/page.js
'use client'
import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import BlogCard from '../components/BlogCard'
import Sidebar from '../components/Sidebar'

export default function HomePage() {
  const { blogs } = useApp()
  const [q, setQ] = useState('')

  const allTags = useMemo(() => [...new Set(blogs.flatMap(b => b.tags))], [blogs])

  const filtered = useMemo(() => {
    if (!q.trim()) return blogs
    const ql = q.toLowerCase()
    return blogs.filter(b => b.title.toLowerCase().includes(ql) || b.excerpt.toLowerCase().includes(ql) || b.tags.join(' ').toLowerCase().includes(ql))
  }, [blogs, q])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        {filtered.map(b => <BlogCard key={b.id} blog={b} />)}
      </div>

      <Sidebar tags={allTags} onSearch={setQ} />


      
      <div className="p-4 bg-indigo-600 text-white rounded-xl">
  ✅ Tailwind 3 working perfectly
</div>

    </section>
    
  )
}
