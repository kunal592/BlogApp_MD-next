'use client'
import BlogListItem from './BlogListItem'

const BlogList = ({ blogs }) => {
  return (
    <div className="space-y-8">
      {blogs.map(blog => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
