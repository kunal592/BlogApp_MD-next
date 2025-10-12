// src/app/profile/[id]/page.js
'use client'
import { useApp } from '../../../context/AppContext'
import ProfileCard from '../../../components/ProfileCard'
import BlogCard from '../../../components/BlogCard'

export default function ProfilePage({ params }) {
  const { users, blogs } = useApp()
  const user = users.find(u => u.id === params.id)
  if (!user) return <div className="card">User not found</div>

  const authored = blogs.filter(b => b.authorId === params.id)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="card">
          <ProfileCard userId={params.id} />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Articles by {user.name}</h3>
          {authored.length ? authored.map(b => <BlogCard key={b.id} blog={b} />) : <div className="card">No articles yet.</div>}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="card">
          <h4 className="font-semibold">Followers</h4>
          <div className="mt-2 text-sm text-slate-500">{user.followers} followers</div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Following</h4>
          <div className="mt-2 text-sm text-slate-500">{user.following} following</div>
        </div>
      </aside>
    </section>
  )
}
