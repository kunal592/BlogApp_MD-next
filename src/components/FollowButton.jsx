
'use client'
import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { toggleFollow } from '@/lib/api';

const FollowButton = ({ userId, isFollowing: initialIsFollowing = false }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollow = useCallback(async () => {
    if (!session) {
      toast.error('Please log in to follow this user.');
      return;
    }

    const originalIsFollowing = isFollowing;
    setIsFollowing(!isFollowing);

    try {
      await toggleFollow(userId);
    } catch (error) {
      setIsFollowing(originalIsFollowing);
      toast.error('Failed to update follow status.');
    }
  }, [session, userId, isFollowing]);

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded-full font-semibold ${
        isFollowing
          ? 'bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200'
          : 'bg-blue-500 text-white'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
