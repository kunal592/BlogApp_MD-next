'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ThumbsUp, MessageSquare } from 'lucide-react'

const Comment = ({ comment }) => {
  const { users, addReply, likeComment, currentUser } = useApp()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState('')

  const author = users.find(u => u.id === comment.authorId) || { name: 'Unknown' }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return
    addReply(comment.id, replyText)
    setReplyText('')
    setShowReplyForm(false)
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
      <div className="flex items-start">
        <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
          <div className="mt-3 flex items-center space-x-4">
            <button
              onClick={() => likeComment(comment.id)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <ThumbsUp size={16} />
              <span>{comment.likes || 0}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-4 ml-14">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-neutral-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-700 focus:ring-0"
            placeholder={`Reply to ${author.name}...`}
            rows="2"
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Post Reply
            </button>
          </div>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-14 space-y-4">
          {comment.replies.map(reply => {
            const replyAuthor = users.find(u => u.id === reply.authorId) || { name: 'Unknown' }
            return (
              <div key={reply.id} className="flex items-start">
                <img src={replyAuthor.avatar} alt={replyAuthor.name} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-1 bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{replyAuthor.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(reply.createdAt).toLocaleString()}</p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comment
