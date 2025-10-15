
'use client'
import { Share2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'

export default function ShareMenu({ blogTitle, blogUrl }) {
  const shareOptions = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'Reddit',
      url: `https://www.reddit.com/submit?title=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-800">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {shareOptions.map(option => (
          <DropdownMenuItem key={option.name} asChild>
            <a href={option.url} target="_blank" rel="noopener noreferrer">{option.name}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
