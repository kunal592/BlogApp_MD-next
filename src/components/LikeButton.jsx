
'use client'
import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toggleLike } from '@/lib/api';

const LikeButton = ({ blogId, initialLikes = 0, isLiked: initialIsLiked = false }) => {
  const { data: session } = useSession();
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLike = useCallback(async () => {
    if (!session) {
      toast.error('Please log in to like this post.');
      return;
    }

    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(likeCount + (!isLiked ? 1 : -1));

    try {
      await toggleLike(blogId);
    } catch (error) {
      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
      toast.error('Failed to update like status.');
    }
  }, [session, blogId, isLiked, likeCount]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleLike}
        className="flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-neutral-800"
        whileTap={{ scale: 1.2 }}
      >
        <Heart size={18} fill={isLiked ? 'red' : 'none'} color={isLiked ? 'red' : 'currentColor'} />
      </motion.button>
      <span className="font-semibold">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
