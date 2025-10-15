
'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ blogId }) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(`/api/bookmarks/isBookmarked?blogId=${blogId}`)
        .then(res => res.json())
        .then(data => setIsBookmarked(data.isBookmarked));
    }
  }, [session, blogId]);

  const handleBookmark = async () => {
    if (!session) {
      toast.error('Please log in to bookmark this post.');
      return;
    }

    const notification = toast.loading('Updating bookmark...');

    try {
      const res = await fetch('/api/bookmarks', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (res.ok) {
        setIsBookmarked(!isBookmarked);
        toast.success(`Blog ${isBookmarked ? 'removed from' : 'added to'} bookmarks!`, { id: notification });
      } else {
        throw new Error('Failed to update bookmark.');
      }
    } catch (error) { 
      toast.error(error.message, { id: notification });
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-800"
    >
      <Bookmark size={18} className={isBookmarked ? 'text-indigo-500 fill-current' : ''} />
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
}
