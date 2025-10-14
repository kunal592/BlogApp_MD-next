
'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function EditProfile({ user, onClose }) {
  const { setCurrentUser } = useApp()
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio || '')
  const [github, setGithub] = useState(user.github || '')
  const [twitter, setTwitter] = useState(user.twitter || '')

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio, github, twitter }),
    })
    if (res.ok) {
      const updatedUser = await res.json()
      setCurrentUser(updatedUser)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
            <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
