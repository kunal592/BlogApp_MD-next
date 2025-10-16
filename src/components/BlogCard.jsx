
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const BlogCard = ({ blog, className }) => {
    return (
        <Link href={`/blogs/${blog.id}`}>
            <motion.div 
                className={cn("bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300", className)}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.description}</p>
                    <div className="flex items-center">
                        <img src={blog.author.image} alt={blog.author.name} className="w-10 h-10 rounded-full mr-4" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{blog.author.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default BlogCard
