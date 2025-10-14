
'use client'
import Link from 'next/link'
import { useState } from 'react'
import EditProfile from './EditProfile'

export default function ProfileDashboard({ user, session }) {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false)

  const isCurrentUser = session && session.user.id === user.id

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-md text-gray-500 dark:text-gray-400">@{user.id}</p>
          {isCurrentUser && (
            <button onClick={() => setEditProfileOpen(true)} className="mt-2 btn-secondary">Edit Profile</button>
          )}
        </div>
      </div>
      <div>
        <p className="text-lg text-gray-600 dark:text-gray-300">{user.bio || 'This user has not set a bio yet.'}</p>
      </div>
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900 dark:text-white">{user.followers.length}</span>
          <span className="text-gray-500 dark:text-gray-400">Followers</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900 dark:text-white">{user.following.length}</span>
          <span className="text-gray-500 dark:text-gray-400">Following</span>
        </div>
      </div>
      <div className="space-y-2">
        {user.github && <Link href={user.github} target="_blank" className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500">
          <span>GitHub</span>
        </Link>}
        {user.twitter && <Link href={user.twitter} target="_blank" className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500">
          <span>Twitter</span>
        </Link>}
      </div>
      {isEditProfileOpen && <EditProfile user={user} onClose={() => setEditProfileOpen(false)} />}
    </div>
  )
}
