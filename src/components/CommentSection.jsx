'use client'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import Comment from './Comment'
import Image from 'next/image'

export default function CommentSection({ blogId }) {
  const { comments, fetchComments, addComment, currentUser } = useApp()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments(blogId)
  }, [blogId, fetchComments])

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h2>

      <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-start">
            <Image src={currentUser?.image} width={40} height={40} alt={currentUser?.name} className="w-10 h-10 rounded-full mr-4" />
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
                    disabled={loading || !text.trim() || !currentUser}
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {comments.map(c => <Comment key={c.id} comment={c} />)}
      </div>
    </section>
  )
}
