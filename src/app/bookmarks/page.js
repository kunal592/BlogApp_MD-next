'use client'
import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import BlogList from '../../components/BlogList'

export default function BookmarksPage() {
  const { blogs, bookmarks } = useApp()

  const bookmarkedBlogs = useMemo(() => {
    return blogs.filter(blog => bookmarks.includes(blog.id))
  }, [blogs, bookmarks])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Your Bookmarks</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Posts you've saved for later</p>
      </header>
      
      {bookmarkedBlogs.length > 0 ? (
        <BlogList blogs={bookmarkedBlogs} />
      ) : (
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">You haven't bookmarked any posts yet.</p>
        </div>
      )}
    </div>
  )
}
