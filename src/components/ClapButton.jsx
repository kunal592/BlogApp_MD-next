
'use client'
import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClapButton = ({ blogId, initialClaps = 0 }) => {
  const { data: session } = useSession();
  const [clapCount, setClapCount] = useState(initialClaps);
  const [isClapping, setIsClapping] = useState(false);

  const handleClap = useCallback(async () => {
    if (!session) {
      toast.error('Please log in to clap for this post.');
      return;
    }

    setIsClapping(true);

    try {
      const res = await fetch('/api/claps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (res.ok) {
        const data = await res.json();
        setClapCount(data.likes);
      } else {
        throw new Error('Failed to clap for the post.');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [session, blogId]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleClap}
        onAnimationComplete={() => setIsClapping(false)}
        className="relative flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-neutral-800"
        whileTap={{ scale: 1.1 }}
      >
        {isClapping && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute text-lg font-bold"
            >
              +1
            </motion.div>
          </AnimatePresence>
        )}
        <Hand size={18} />
      </motion.button>
      <span className="font-semibold">{clapCount}</span>
    </div>
  );
};

export default ClapButton;
