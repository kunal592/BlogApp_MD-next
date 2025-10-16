
'use client'
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ blogId, isBookmarked: initialIsBookmarked }) {
    const { bookmarkBlog, unbookmarkBlog, currentUser } = useApp();
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    const handleBookmark = async () => {
        if (!currentUser) return;

        if (isBookmarked) {
            await unbookmarkBlog(blogId);
            setIsBookmarked(false);
        } else {
            await bookmarkBlog(blogId);
            setIsBookmarked(true);
        }
    };

    return (
        <button
            onClick={handleBookmark}
            disabled={!currentUser}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 transition-colors duration-200"
        >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="font-medium">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
    );
}
