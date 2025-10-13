'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Comment from './Comment'

export default function CommentSection({ blogId }) {
  const { comments, addComment, currentUser } = useApp()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const blogComments = comments
    .filter(c => c.blogId === blogId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  function handlePost() {
    if (!text.trim() || loading) return
    setLoading(true)
    addComment(blogId, text.trim())
    setTimeout(() => {
        setText('')
        setLoading(false)
    }, 500)

  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({blogComments.length})</h2>

      <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-start">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-1">
                <textarea
                placeholder="Write a comment..."
                className="w-full p-3 rounded-md bg-gray-50 dark:bg-neutral-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-600 focus:ring-0 transition"
                value={text}
                onChange={e => setText(e.target.value)}
                rows="3"
                />
                <div className="flex justify-end mt-3">
                <button 
                    className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:focus:ring-offset-neutral-900"
                    onClick={handlePost} 
                    disabled={loading || !text.trim()}
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {blogComments.map(c => <Comment key={c.id} comment={c} />)}
      </div>
    </section>
  )
}
