
'use client'

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Comment from './Comment';
import { Send } from 'lucide-react';

export default function CommentSection({ blogId }) {
    const { comments, addComment, currentUser } = useApp();
    const [newComment, setNewComment] = useState('');

    const blogComments = comments.filter(c => c.blogId === blogId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;
        addComment(blogId, newComment);
        setNewComment('');
    };

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Comments ({blogComments.length})</h2>
            
            {currentUser && (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-4 pr-16 rounded-lg bg-gray-100 dark:bg-neutral-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-700 focus:ring-0 transition-all duration-200"
                            placeholder="Write a comment..."
                            rows="3"
                        />
                        <button
                            type="submit"
                            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors duration-200"
                            disabled={!newComment.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {blogComments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
