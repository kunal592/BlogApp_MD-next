// src/components/CommentSection.jsx
'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function CommentSection({ blogId }) {
  const { comments, addComment, users } = useApp()
  const [text, setText] = useState('')
  const blogComments = comments.filter(c => c.blogId === blogId)

  function handlePost() {
    if (!text.trim()) return
    addComment(blogId, text.trim())
    setText('')
  }

  return (
    <section className="mt-6">
      <h3 className="font-semibold">Comments ({blogComments.length})</h3>

      <div className="mt-3">
        <textarea
          placeholder="Write a comment..."
          className="w-full p-3 rounded-md bg-slate-50 dark:bg-neutral-800"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button className="btn" onClick={handlePost}>Post Comment</button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {blogComments.map(c => {
          const author = users.find(u => u.id === c.authorId) || { name: 'Unknown' }
          return (
            <div key={c.id} className="bg-white dark:bg-neutral-900 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-500">{c.likes} likes</div>
              </div>
              <p className="mt-2">{c.content}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
