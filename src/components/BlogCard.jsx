'use client'
import Link from 'next/link'
import { useApp } from '../context/AppContext'
import { Trash2 } from 'lucide-react'

export default function BlogCard({ blog, showAuthor = true }) {
  const { users, currentUser, deleteBlog } = useApp()
  const author = users.find(u => u.id === blog.authorId)

  const isAuthor = currentUser && currentUser.id === blog.authorId

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(blog.id);
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 relative">
      {isAuthor && (
        <button 
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
          aria-label="Delete blog post"
        >
          <Trash2 size={18} />
        </button>
      )}
      <Link href={`/blog/${blog.id}`} className="block">
        <img className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">{blog.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 h-12 overflow-hidden text-ellipsis">{blog.excerpt}</p>
          {showAuthor && author && (
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-4" src={author.avatar} alt={author.name} />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">{author.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
