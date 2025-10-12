'use client'
import { useApp } from '../../../context/AppContext'
import ProfileCard from '../../../components/ProfileCard'
import BlogCard from '../../../components/BlogCard'

export default function ProfilePage({ params }) {
  const { users, blogs } = useApp()
  const user = users.find(u => u.id === params.id)

  if (!user) return <div className="text-center py-16">User not found</div>

  const authoredBlogs = blogs.filter(b => b.authorId === params.id)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard userId={params.id} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Articles by {user.name}</h2>
          <div className="space-y-6">
            {authoredBlogs.length > 0 ? (
              authoredBlogs.map(b => <BlogCard key={b.id} blog={b} />)
            ) : (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
                <p className="text-lg text-gray-500 dark:text-gray-400">This user hasn't posted any articles yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
