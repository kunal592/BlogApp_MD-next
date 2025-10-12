'use client'
import Link from 'next/link'
import { useApp } from '../context/AppContext'
import { ThumbsUp, MessageCircle } from 'lucide-react'

export default function BlogCard({ blog }) {
  const { users } = useApp()
  const author = users.find(u => u.id === blog.authorId) || { name: 'Unknown' }
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img className="w-10 h-10 rounded-full mr-4" src={author.avatar} alt={author.name} />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{author.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.excerpt}</p>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp size={18} />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={18} />
              <span>{blog.comments}</span>
            </div>
          </div>
          <Link href={`/blog/${blog.id}`} className="font-semibold text-indigo-600 hover:text-indigo-700">
            Read more &rarr;
          </Link>
        </div>
      </div>
    </article>
  )
}
