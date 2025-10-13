'use client'
import { useApp } from '../context/AppContext'

export default function ProfileCard({ user }) {
  const { currentUser, toggleFollow, following } = useApp()
  const isFollowing = following.includes(user.id)
  const isCurrentUser = currentUser.id === user.id

  return (
    <div className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-6 flex flex-col items-center text-center">
      <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-indigo-500 dark:ring-indigo-400" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-1">@{user.id}</p>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">{user.bio || 'This user has not set a bio yet.'}</p>
      <div className="flex space-x-6 mt-6">
        <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{user.followers || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
        </div>
        <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{user.following || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
        </div>
      </div>
      {!isCurrentUser && (
        <button 
          onClick={() => toggleFollow(user.id)}
          className={`mt-6 px-8 py-2 rounded-full font-semibold transition-colors ${isFollowing 
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`
          }>
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  )
}
