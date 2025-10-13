'use client'
import { useState, useMemo, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import BlogGrid from '../components/BlogGrid'
import BlogList from '../components/BlogList'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import { LayoutGrid, List } from 'lucide-react'

export default function HomePage() {
  const { blogs, setBlogs } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching blogs
    setTimeout(() => {
      // In a real app, you would fetch blogs from an API here
      // For now, we'll just use the initial empty array of blogs
      setLoading(false)
    }, 1000) // Simulate a 1-second loading time
  }, [])

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

  if (loading) {
    return <div className="text-center py-20">Loading blogs...</div>
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
          <div className="flex justify-between items-center mb-6">
            {selectedTag ? (
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filtered by: <span className="text-indigo-600">{selectedTag}</span></h2>
                    <button 
                        onClick={() => setSelectedTag(null)}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Clear Filter
                    </button>
                </div>
            ) : <div />}
            <div className="flex items-center space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800'}`}>
                <LayoutGrid size={20} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800'}`}>
                <List size={20} />
              </button>
            </div>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">No blogs found.</div>
          ) : viewMode === 'grid' ? (
            <BlogGrid blogs={filteredBlogs} />
          ) : (
            <BlogList blogs={filteredBlogs} />
          )}
        </main>

        <aside className="lg:col-span-1">
          <Sidebar tags={allTags} onTagClick={handleTagClick} />
        </aside>
      </div>
    </div>
  )
}
