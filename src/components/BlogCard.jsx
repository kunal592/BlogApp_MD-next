
'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function BlogCard({ blog, view }) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const notification = toast.loading('Deleting blog post...')
      try {
        const res = await fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' })
        if (res.ok) {
          toast.success('Blog post deleted', { id: notification })
          router.refresh()
        } else {
          throw new Error('Failed to delete blog post')
        }
      } catch (error) {
        toast.error(error.message, { id: notification })
      }
    }
  }

  const isAuthor = session?.user?.id === blog.authorId

  if (view === 'list') {
    return (
      <div className="bg-gray-100 dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-indigo-500/30 flex flex-col md:flex-row">
        <img className="w-full md:w-1/3 h-48 object-cover" src={blog.image} alt={blog.title} />
        <div className="p-6 flex flex-col justify-between w-full">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">{blog.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden text-ellipsis">{blog.excerpt}</p>
            <div className="flex items-center mb-4">
              <img className="w-10 h-10 rounded-full mr-4" src={blog.author.image} alt={blog.author.name} />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">{blog.author.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            {isAuthor && (
              <>
                <Link href={`/edit/${blog.id}`} className="btn-xs btn-outline">Edit</Link>
                <button onClick={handleDelete} className="btn-xs btn-outline text-red-500">Delete</button>
              </>
            )}
            <Link href={`/blog/${blog.id}`} className="btn-xs btn-outline text-indigo-600 dark:text-indigo-400">Read More &rarr;</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-indigo-500/30 flex flex-col">
      <img className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">{blog.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden text-ellipsis flex-grow">{blog.excerpt}</p>
        <div className="flex items-center mt-auto pt-4 border-t border-gray-200 dark:border-neutral-700">
          <img className="w-10 h-10 rounded-full mr-4" src={blog.author.image} alt={blog.author.name} />
          <div>
            <p className="text-gray-900 dark:text-white font-semibold">{blog.author.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      {isAuthor && (
        <div className="flex gap-3 p-3 bg-gray-50 dark:bg-neutral-900/50">
          <Link href={`/edit/${blog.id}`} className="btn-xs btn-outline w-full">Edit</Link>
          <button onClick={handleDelete} className="btn-xs btn-outline text-red-500 w-full">Delete</button>
        </div>
      )}
      <Link href={`/blog/${blog.id}`} className="btn btn-primary rounded-t-none">Continue Reading &rarr;</Link>
    </div>
  )
}
