// src/app/blog/[id]/page.js
'use client'
import React, { useState } from 'react'
import { useApp } from '../../../context/AppContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CommentSection from '../../../components/CommentSection'

export default function BlogDetailPage({ params }) {
  const { blogs, users, toggleLike, toggleBookmark } = useApp()
  const blog = blogs.find(b => b.id === params.id)
  const [showSummary, setShowSummary] = useState(false)

  if (!blog) return <div className="card">Blog not found</div>
  const author = users.find(u => u.id === blog.authorId) || { name: 'Unknown' }

  // Dummy summary for AI Summarize
  const dummySummary = `${blog.title} — Summary: This article explains core ideas for ${blog.tags.join(', ')}.`

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-sm text-slate-500">by {author.name} • {blog.createdAt} • {blog.tags.join(', ')}</p>
      </header>

      <div className="prose dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="btn" onClick={() => toggleLike(blog.id)}>
          {blog._liked ? 'Unlike' : 'Like'} ({blog.likes})
        </button>

        <button className="btn bg-gray-700 hover:bg-gray-800" onClick={() => toggleBookmark(blog.id)}>
          Bookmark
        </button>

        <button className="btn bg-indigo-500 hover:bg-indigo-600" onClick={() => setShowSummary(s => !s)}>
          AI Summarize
        </button>
      </div>

      {showSummary && (
        <div className="card">
          <h4 className="font-semibold">AI Summary (demo)</h4>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{dummySummary}</p>
        </div>
      )}

      <div className="card">
        <h4 className="font-semibold">About the author</h4>
        <div className="mt-3 flex items-center gap-3">
          <img src={author.avatar} className="w-14 h-14 rounded-full" alt="author" />
          <div>
            <div className="font-semibold">{author.name}</div>
            <div className="text-sm text-slate-500">{author.bio}</div>
          </div>
        </div>
      </div>

      <CommentSection blogId={blog.id} />
    </article>
  )
}
