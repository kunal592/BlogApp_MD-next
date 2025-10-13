'use client'
import Link from 'next/link'
import Image from 'next/image'

const BlogListItem = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out flex">
      <div className="w-1/3 md:w-1/4 relative">
        <Link href={`/blog/${blog.id}`}>
          <Image
            src={blog.image}
            alt={blog.title}
            layout="fill"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="w-2/3 md:w-3/4 p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
        <Link href={`/blog/${blog.id}`}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2 hover:text-indigo-600 transition-colors duration-300">{blog.title}</h2>
        </Link>
        <p className="mt-4 text-gray-600 dark:text-gray-300 hidden md:block">{blog.excerpt}</p>
        <div className="mt-4 flex items-center">
          <Image
            src={blog.authorAvatar}
            alt={blog.author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="font-semibold text-gray-800 dark:text-gray-200">{blog.author}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogListItem
