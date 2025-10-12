
// src/components/BlogList.jsx
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <div className="space-y-4">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
