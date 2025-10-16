
'use client'
import { Share2 } from 'lucide-react';

export default function ShareMenu({ blogTitle, blogUrl }) {

    const handleCopy = () => {
        navigator.clipboard.writeText(blogUrl);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
            <Share2 size={20} />
            <span className="font-medium">Share</span>
        </button>
    );
}
