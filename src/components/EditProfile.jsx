
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

export default function EditProfile({ user, onClose }) {
  const router = useRouter()
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio || '')
  const [avatar, setAvatar] = useState(user.image || '')

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    const notification = toast.loading('Updating your profile...')
    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, image: avatar }),
      })
      if (res.ok) {
        toast.success('Profile updated successfully!', { id: notification })
        router.refresh()
        onClose()
      } else {
        throw new Error('Failed to update profile.')
      }
    } catch (error) {
      toast.error(error.message, { id: notification })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl m-4 transform transition-all duration-300 ease-in-out scale-95 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
                <X size={24} className="text-gray-500 dark:text-gray-400" />
            </button>
        </div>
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg" />
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Enter image URL for your new avatar"
              className="w-full bg-gray-50 dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-gray-50 dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                rows="4" 
                className="w-full bg-gray-50 dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-premium">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
