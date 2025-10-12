'use client'
import { useState } from 'react'
import { Share2, Link, Twitter, Linkedin, Facebook } from 'lucide-react'

export default function ShareMenu({ blogTitle, blogUrl }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl)
    alert('Link copied to clipboard!')
    setIsOpen(false)
  }

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <Link size={20} />,
      action: copyToClipboard
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${blogUrl}&text=${encodeURIComponent(blogTitle)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}&title=${encodeURIComponent(blogTitle)}`, '_blank')
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`, '_blank')
    },
  ]

  return (
    <div className="relative">
      <button 
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-colors"
      >
        <Share2 size={18} />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                {option.icon}
                <span className="ml-3">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
