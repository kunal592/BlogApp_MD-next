
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlogCard from './BlogCard'
import BlogListItem from './BlogListItem'
import Sidebar from './Sidebar'
import { cn } from '@/lib/utils'
import ViewToggle from './ViewToggle'
const BlogContainer = ({ blogs }) => {
    const [layout, setLayout] = useState('grid')
    const [selectedTag, setSelectedTag] = useState(null)

    const allTags = [...new Set(blogs.flatMap(blog => blog.tags || []))]
    const filteredBlogs = selectedTag ? blogs.filter(blog => (blog.tags || []).includes(selectedTag)) : blogs

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center">
                <p className="text-lg text-gray-500 dark:text-gray-400">No blogs available at the moment. Please check back later.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Sidebar tags={allTags} onTagClick={setSelectedTag} selectedTag={selectedTag} />
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{selectedTag ? `Blogs tagged with "${selectedTag}"` : 'All Blogs'}</h2>
                    <ViewToggle layout={layout} setLayout={setLayout} />
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={layout}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {layout === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map(blog => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBlogs.map(blog => (
                                    <BlogListItem key={blog.id} blog={blog} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default BlogContainer
