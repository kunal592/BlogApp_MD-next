
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BlogListItem = ({ blog, className }) => {
  return (
    <Link href={`/blogs/${blog.id}`} className="block w-full">
      <motion.div
        className={cn(
          "bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full",
          className
        )}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{blog.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{blog.description}</p>
          </div>
          <div className="flex items-center shrink-0 mt-4 sm:mt-0">
            <img src={blog.author.image} alt={blog.author.name} className="w-8 h-8 rounded-full mr-3" />
            <div className='text-left sm:text-right'>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{blog.author.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogListItem;
