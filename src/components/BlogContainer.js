'use client'
import { useState } from 'react'
import BlogCard from './BlogCard'
import BlogListItem from './BlogListItem'
import Sidebar from './Sidebar'

const BlogContainer = ({ blogs }) => {
    const [layout, setLayout] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)
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
        <div className="flex">
            <Sidebar tags={allTags} onTagClick={setSelectedTag} />
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="lg:hidden">
                        <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-1 rounded-md bg-gray-200 dark:bg-neutral-700">Filter</button>
                        {showFilters && (
                            <div className="absolute z-10 bg-white dark:bg-neutral-800 p-4 rounded-md shadow-lg">
                                <Sidebar tags={allTags} onTagClick={setSelectedTag} />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => setLayout('grid')} className={`mr-2 px-3 py-1 rounded-md ${layout === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700'}`}>Grid</button>
                        <button onClick={() => setLayout('list')} className={`px-3 py-1 rounded-md ${layout === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700'}`}>List</button>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

export default BlogContainer
