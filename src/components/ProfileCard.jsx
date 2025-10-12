'use client'
import { useApp } from '../context/AppContext'
import { AtSign, Calendar, MapPin } from 'lucide-react'

export default function ProfileCard({ userId }) {
  const { users, following, toggleFollow, currentUser } = useApp()
  const user = users.find(u => u.id === userId)
  if (!user) return null
  const isFollowing = following.includes(userId)

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
      <div className="h-32 bg-gray-200 dark:bg-neutral-800 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }}></div>
      <div className="p-6">
        <div className="flex items-end -mt-16">
          <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-900" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 my-4">{user.bio}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <AtSign size={16} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-4 border-t border-gray-200 dark:border-neutral-800 pt-4">
          <div>
            <span className="font-bold text-gray-900 dark:text-white">{user.followers}</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">Followers</span>
          </div>
          <div>
            <span className="font-bold text-gray-900 dark:text-white">{user.following}</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">Following</span>
          </div>
        </div>

        {currentUser.id !== userId && (
          <div className="mt-6">
            <button 
              className={`px-6 py-2 rounded-full font-semibold ${isFollowing ? 'bg-gray-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              onClick={() => toggleFollow(userId)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
