'use client'
import React from 'react'

export default function BlogManager({ blogs }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Blog ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Author ID</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id} className="bg-white border-b dark:bg-neutral-900 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{blog.id}</td>
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4">{blog.authorId}</td>
                <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline">Edit</button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
