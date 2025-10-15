
'use client'
import Link from 'next/link'
import { useState } from 'react'
import EditProfile from './EditProfile'
import { AtSign, Github, Twitter } from 'lucide-react'

export default function ProfileDashboard({ user, session }) {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false)

  const isCurrentUser = session && session.user.id === user.id

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="card overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-600" />
        <div className="p-6 flex items-center gap-6 -mt-16">
          <img src={user.image} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg" />
          <div className="pt-16">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-md text-gray-500 dark:text-gray-400 flex items-center gap-1"><AtSign size={16} />{user.id}</p>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">{user.bio || 'This user has not set a bio yet.'}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                {user.github && 
                    <Link href={user.github} target="_blank" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                        <Github size={18} />
                        <span>GitHub</span>
                    </Link>
                }
                {user.twitter && 
                    <Link href={user.twitter} target="_blank" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                        <Twitter size={18} />
                        <span>Twitter</span>
                    </Link>
                }
            </div>
        </div>
        <div className="card-footer flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="text-center">
              <span className="font-bold text-xl text-gray-900 dark:text-white">{user.followers.length}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-xl text-gray-900 dark:text-white">{user.following.length}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">Following</span>
            </div>
          </div>
          {isCurrentUser && (
            <button onClick={() => setEditProfileOpen(true)} className="btn-premium">Edit Profile</button>
          )}
        </div>
      </div>
      {isEditProfileOpen && <EditProfile user={user} onClose={() => setEditProfileOpen(false)} />}
    </div>
  )
}
