// src/components/ProfileCard.jsx
'use client'
import { useApp } from '../context/AppContext'

export default function ProfileCard({ userId }) {
  const { users, following, toggleFollow, currentUser } = useApp()
  const user = users.find(u => u.id === userId)
  if (!user) return null
  const isFollowing = following.includes(userId)
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
        <div>
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-slate-500">{user.bio}</div>
          <div className="text-xs text-slate-500 mt-2">{user.followers} followers • {user.following} following</div>
        </div>
      </div>

      {currentUser.id !== userId && (
        <div className="mt-4">
          <button className={`btn ${isFollowing ? 'bg-gray-600' : ''}`} onClick={() => toggleFollow(userId)}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      )}
    </div>
  )
}
