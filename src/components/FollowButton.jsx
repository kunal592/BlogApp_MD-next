'use client'
import { useState } from 'react'
import { UserPlus, UserCheck } from 'lucide-react'

export default function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <button 
      onClick={handleFollow}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isFollowing
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-700'
      }`}
    >
      {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
      <span>{isFollowing ? 'Following' : 'Follow'}</span>
    </button>
  )
}
