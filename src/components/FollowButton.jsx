
'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { UserPlus, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FollowButton({ targetUserId }) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(`/api/follow/isFollowing?targetUserId=${targetUserId}`)
        .then(res => res.json())
        .then(data => setIsFollowing(data.isFollowing));
    }
  }, [session, targetUserId]);

  const handleFollow = async () => {
    if (!session) {
      toast.error('Please log in to follow this user.');
      return;
    }

    const notification = toast.loading('Updating follow status...');

    try {
      const res = await fetch('/api/follow', {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId }),
      });

      if (res.ok) {
        setIsFollowing(!isFollowing);
        toast.success(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} user!`, { id: notification });
      } else {
        throw new Error('Failed to update follow status.');
      }
    } catch (error) {
      toast.error(error.message, { id: notification });
    }
  };

  return (
    <motion.button
      onClick={handleFollow}
      className={`flex items-center justify-center rounded-full font-medium text-sm overflow-hidden focus:outline-none`}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isFollowing ? '#4f46e5' : '#f3f4f6',
        color: isFollowing ? 'white' : '#374151',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isFollowing ? (
          <motion.div
            key="following"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            className="flex items-center gap-2"
          >
            <UserCheck size={16} />
            <span>Following</span>
          </motion.div>
        ) : (
          <motion.div
            key="follow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            <span>Follow</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
