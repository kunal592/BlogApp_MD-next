
'use client'
import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { toggleBookmark } from '@/lib/api';

const BookmarkButton = ({ blogId, isBookmarked: initialIsBookmarked = false }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const handleBookmark = useCallback(async () => {
    if (!session) {
      toast.error('Please log in to bookmark this post.');
      return;
    }

    const originalIsBookmarked = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await toggleBookmark(blogId);
    } catch (error) {
      setIsBookmarked(originalIsBookmarked);
      toast.error('Failed to update bookmark status.');
    }
  }, [session, blogId, isBookmarked]);

  return (
    <motion.button
      onClick={handleBookmark}
      className="flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-neutral-800"
      whileTap={{ scale: 1.2 }}
    >
      <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
    </motion.button>
  );
};

export default BookmarkButton;
