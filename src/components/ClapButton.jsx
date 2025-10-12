'use client'
import { useState } from 'react'
import { Hand } from 'lucide-react'

export default function ClapButton({ initialClaps = 0 }) {
  const [claps, setClaps] = useState(initialClaps)
  const [hasClapped, setHasClapped] = useState(false)

  const handleClap = () => {
    if (!hasClapped) {
      setClaps(claps + 1)
      setHasClapped(true)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={handleClap}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
          hasClapped 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-neutral-700'
        }`}
        aria-label="Clap for this post"
      >
        <Hand size={24} />
      </button>
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{claps}</span>
    </div>
  )
}