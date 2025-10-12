'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-lg bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-full focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 hover:text-indigo-500 transition-colors">
          <Search />
        </button>
      </div>
    </form>
  )
}
