'use client'
import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import BlogGrid from '../components/BlogGrid'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'

export default function HomePage() {
  const { blogs } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  const allTags = useMemo(() => [...new Set(blogs.flatMap(b => b.tags))], [blogs])

  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    if (selectedTag) {
      filtered = filtered.filter(b => b.tags.includes(selectedTag))
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(lowerCaseQuery) ||
        b.excerpt.toLowerCase().includes(lowerCaseQuery)
      )
    }

    return filtered
  }, [blogs, searchQuery, selectedTag])

  const handleTagClick = (tag) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Welcome to Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Discover insightful articles on web development, design, and more.</p>
      </div>
      
      <div className="mb-8 max-w-3xl mx-auto">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <main className="lg:col-span-3">
          {selectedTag && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filtered by: <span className="text-indigo-600">{selectedTag}</span></h2>
              <button 
                onClick={() => setSelectedTag(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Clear Filter
              </button>
            </div>
          )}
          <BlogGrid blogs={filteredBlogs} />
        </main>

        <aside className="lg:col-span-1">
          <Sidebar tags={allTags} onTagClick={handleTagClick} />
        </aside>
      </div>
    </div>
  )
}
