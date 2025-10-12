'use client'
import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CommentSection from '../../../components/CommentSection'
import Modal from '../../../components/Modal'
import ClapButton from '../../../components/ClapButton'
import FollowButton from '../../../components/FollowButton'
import ShareMenu from '../../../components/ShareMenu'
import { Bookmark, Bot } from 'lucide-react'

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export default function BlogDetailPage({ params }) {
  const { blogs, users, toggleBookmark } = useApp()
  const blog = blogs.find(b => b.id === params.id)
  const [showSummary, setShowSummary] = useState(false)
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBlogUrl(window.location.href)
    }
  }, [])

  if (!blog) return <div className="text-center py-16">Blog not found</div>
  const author = users.find(u => u.id === blog.authorId) || { name: 'Unknown' }

  const readingTime = calculateReadingTime(blog.content)
  const dummySummary = `${blog.title} — Summary: This article explains core ideas for ${blog.tags.join(', ')}.`

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <span>by {author.name}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </div>

      <div className="flex items-center justify-between my-8">
        <div className="flex flex-wrap gap-4">
          <ClapButton initialClaps={blog.likes} />
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-800"
            onClick={() => toggleBookmark(blog.id)}
          >
            <Bookmark size={18} />
            <span>Bookmark</span>
          </button>

          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => setShowSummary(true)}
          >
            <Bot size={18} />
            <span>AI Summarize</span>
          </button>
          <ShareMenu blogTitle={blog.title} blogUrl={blogUrl} />
        </div>
      </div>

      <Modal isOpen={showSummary} onClose={() => setShowSummary(false)} title="AI Summary">
        <p className="text-gray-700 dark:text-gray-300">{dummySummary}</p>
      </Modal>

      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={author.avatar} className="w-16 h-16 rounded-full" alt="author" />
              <div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white">{author.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{author.bio}</div>
              </div>
            </div>
          <FollowButton />
        </div>
      </div>

      <CommentSection blogId={blog.id} />
    </article>
  )
}
