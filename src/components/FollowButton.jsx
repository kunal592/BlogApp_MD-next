
'use client'
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function FollowButton({ userId, isFollowing: initialIsFollowing }) {
    const { followUser, unfollowUser, currentUser } = useApp();
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleFollow = async () => {
        if (!currentUser || currentUser.id === userId) return;

        if (isFollowing) {
            await unfollowUser(userId);
            setIsFollowing(false);
        } else {
            await followUser(userId);
            setIsFollowing(true);
        }
    };

    return (
        <button
            onClick={handleFollow}
            disabled={!currentUser || currentUser.id === userId}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:focus:ring-offset-neutral-900"
        >
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
}
