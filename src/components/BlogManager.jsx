
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function BlogManager({ blogs }) {
  const router = useRouter()

  const handleEdit = (id) => {
    router.push(`/edit/${id}`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const notification = toast.loading('Deleting blog...')
      try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
        if (res.ok) {
          toast.success('Blog deleted successfully', { id: notification })
          router.refresh()
        } else {
          throw new Error('Failed to delete blog')
        }
      } catch (error) {
        toast.error(error.message, { id: notification })
      }
    }
  }

  return (
    <div className="bg-neutral-900 rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-neutral-800 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id} className="bg-neutral-900 border-b border-neutral-800 hover:bg-neutral-800">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{blog.title}</td>
                <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 space-x-4 text-right">
                  <button onClick={() => handleEdit(blog.id)} className="font-medium text-indigo-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="font-medium text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
