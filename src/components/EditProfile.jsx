
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Edit Profile</h2>
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="flex items-center gap-6">
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500" />
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Enter image URL for your new avatar"
              className="mt-1 block w-full bg-neutral-800 border-neutral-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-neutral-800 border-neutral-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" className="mt-1 block w-full bg-neutral-800 border-neutral-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
