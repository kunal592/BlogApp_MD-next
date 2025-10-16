'use client'
import { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { api } from '@/lib/axios'
import { Edit3 } from 'lucide-react'
import EditProfile from '@/components/EditProfile'
import BlogGrid from '@/components/BlogGrid'

export default function ProfilePage() {
  const { currentUser } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${currentUser.id}`)
      setUser(res.data)
    } catch (error) {
      console.error("Failed to fetch user data", error)
    }
  }

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser)
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <img
              className="w-32 h-32 rounded-full object-cover shadow-md"
              src={user.image || 'https://i.pravatar.cc/150'}
              alt={user.name}
            />
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="mt-3 text-base text-gray-700 dark:text-gray-300 max-w-lg">{user.bio}</p>
              <div className="mt-4 flex justify-center sm:justify-start space-x-6">
                <div className="text-center">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{user.followers.length}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400"> Followers</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{user.following.length}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400"> Following</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto">
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Edit3 className="mr-2 h-4 w-4"/>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bookmarked Blogs</h2>
        {user.bookmarks.length > 0 ? (
          <BlogGrid blogs={user.bookmarks.map(b => b.blog)} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">You haven't bookmarked any blogs yet.</p>
        )}
      </div>
      
      {isEditing && (
        <EditProfile 
          user={user} 
          onClose={() => setIsEditing(false)} 
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </div>
  )
}
