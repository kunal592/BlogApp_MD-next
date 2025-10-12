'use client'
import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import BlogGrid from '../../components/BlogGrid'
import BlogList from '../../components/BlogList'
import ViewToggle from '../../components/ViewToggle'

export default function FeedPage() {
  const { blogs, following } = useApp()
  const [viewMode, setViewMode] = useState('grid')

  const feedBlogs = useMemo(() => blogs.filter(b => following.includes(b.authorId)), [blogs, following])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Feed</h1>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {feedBlogs.length > 0 ? (
        viewMode === 'grid' ? <BlogGrid blogs={feedBlogs} /> : <BlogList blogs={feedBlogs} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 dark:text-gray-400">No posts from authors you follow yet.</p>
        </div>
      )}
    </section>
  )
}
