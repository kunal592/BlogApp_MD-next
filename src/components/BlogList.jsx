
'use client'
import { useApp } from '../context/AppContext'
import BlogCard from './BlogCard'

const BlogList = ({ blogs }) => {
  const { viewMode } = useApp()

  return (
    <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} view={viewMode} />
      ))}
    </div>
  )
}

export default BlogList
