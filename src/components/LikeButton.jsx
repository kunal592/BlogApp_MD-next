
'use client'
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart } from 'lucide-react';

export default function LikeButton({ blogId, initialLikes, isLiked: initialIsLiked }) {
    const { likeBlog, unlikeBlog, currentUser } = useApp();
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);

    const handleLike = async () => {
        if (!currentUser) return;

        if (isLiked) {
            await unlikeBlog(blogId);
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            await likeBlog(blogId);
            setLikes(likes + 1);
            setIsLiked(true);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={!currentUser}
            className={`flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50 transition-colors duration-200 ${isLiked ? 'text-red-600 dark:text-red-400' : ''
                }`}
        >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="font-medium">{likes}</span>
        </button>
    );
}
