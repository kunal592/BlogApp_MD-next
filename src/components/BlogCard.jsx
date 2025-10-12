// src/components/BlogCard.jsx
'use client'
import Link from 'next/link'
import { useApp } from '../context/AppContext'

export default function BlogCard({ blog }) {
  const { users } = useApp()
  const author = users.find(u => u.id === blog.authorId) || { name: 'Unknown' }
  return (
    <article className="card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-1"><Link href={`/blog/${blog.id}`}>{blog.title}</Link></h3>
      <p className="text-sm text-slate-500 mb-2">by {author.name} • {blog.createdAt} • {blog.tags.join(', ')}</p>
      <p className="text-slate-700 dark:text-slate-300">{blog.excerpt}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-500">{blog.likes} likes • {blog.comments} comments</div>
        <Link href={`/blog/${blog.id}`} className="text-sm text-indigo-600">Read</Link>
      </div>
    </article>
  )
}
