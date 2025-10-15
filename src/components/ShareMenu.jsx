
'use client'
import { Share2, Copy, Mail, Linkedin, Twitter, Facebook } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { toast } from 'react-hot-toast'

export default function ShareMenu({ blogTitle, blogUrl }) {
  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <Copy size={18} />,
      action: () => {
        navigator.clipboard.writeText(blogUrl)
        toast.success('Link copied to clipboard!')
      },
    },
    {
      name: 'Email',
      icon: <Mail size={18} />,
      url: `mailto:?subject=${encodeURIComponent(blogTitle)}&body=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`
    },
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
            {option.url ? (
              <a href={option.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                {option.icon}
                <span>{option.name}</span>
              </a>
            ) : (
              <button onClick={option.action} className="flex items-center gap-2">
                {option.icon}
                <span>{option.name}</span>
              </button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
