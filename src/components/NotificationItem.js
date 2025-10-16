'use client'
import { useState } from 'react'

const NotificationItem = ({ notification, onDelete, onReply }) => {
    const [replying, setReplying] = useState(false)
    const [replyMessage, setReplyMessage] = useState('')

    const handleReply = () => {
        onReply(notification.id, replyMessage)
        setReplying(false)
        setReplyMessage('')
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 flex justify-between items-start">
            <div>
                <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(notification.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
                {!replying && (
                    <button 
                        onClick={() => setReplying(true)}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        Reply
                    </button>
                )}
                <button 
                    onClick={() => onDelete(notification.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                    Delete
                </button>
            </div>
            {replying && (
                <div className="mt-2 w-full flex space-x-2">
                    <input 
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="flex-grow p-2 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
                        placeholder="Write a reply..."
                    />
                    <button 
                        onClick={handleReply}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Send
                    </button>
                    <button 
                        onClick={() => setReplying(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

export default NotificationItem
