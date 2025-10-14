
'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BlogTable from './BlogTable'
import Link from 'next/link'

export default function Dashboard({ userBlogs }) {
  const [activeTab, setActiveTab] = useState('published')

  const publishedBlogs = userBlogs.filter(blog => blog.status === 'published')
  const draftBlogs = userBlogs.filter(blog => blog.status === 'draft')

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Link href="/postblog" className="btn-primary">+ New Blog</Link>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('published')}
            className={`${activeTab === 'published' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`${activeTab === 'drafts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Drafts
          </button>
        </nav>
      </div>
      <div className="mt-8">
        {activeTab === 'published' && <BlogTable blogs={publishedBlogs} />}
        {activeTab === 'drafts' && <BlogTable blogs={draftBlogs} />}
      </div>
    </div>
  )
}
