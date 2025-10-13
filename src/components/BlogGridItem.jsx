'use client'
import Link from 'next/link'
import Image from 'next/image'

const BlogGridItem = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link href={`/blog/${blog.id}`}>
        <div className="relative h-48">
          <Image
            src={blog.image}
            alt={blog.title}
            layout="fill"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
        <Link href={`/blog/${blog.id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2 hover:text-indigo-600 transition-colors duration-300 truncate">{blog.title}</h2>
        </Link>
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

export default BlogGridItem
