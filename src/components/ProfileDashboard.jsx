'use client'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Link from 'next/link'
import { BarChart, Bookmark, Settings, UserPlus } from 'lucide-react'
import EditProfile from './EditProfile'

const StatCard = ({ icon, label, value }) => (
    <div className="bg-gray-100 dark:bg-neutral-700 p-6 rounded-lg flex items-center">
        {icon}
        <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
)

export default function ProfileDashboard({ user }) {
    const { blogs, bookmarks, currentUser } = useApp()
    const [isEditProfileOpen, setEditProfileOpen] = useState(false)
    const bookmarkedBlogs = blogs.filter(b => bookmarks.includes(b.id))
    const userBlogs = blogs.filter(b => b.authorId === user.id)

    const totalBlogs = 50;
    const progress = (userBlogs.length / totalBlogs) * 100;

    const isCurrentUser = currentUser.id === user.id;

    return (
        <div className="max-w-4xl mx-auto my-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<BarChart size={32} className="text-indigo-500" />} label="Blogs Published" value={userBlogs.length} />
                <StatCard icon={<Bookmark size={32} className="text-indigo-500" />} label="Bookmarks" value={bookmarks.length} />
                <div className="grid grid-cols-2 gap-2">
                    <Link href="/settings">
                        <div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg flex items-center h-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <Settings size={28} className="text-indigo-500" />
                            <p className="ml-3 text-md font-bold text-gray-900 dark:text-white">Settings</p>
                        </div>
                    </Link>
                    {isCurrentUser &&
                    <div onClick={() => setEditProfileOpen(true)} className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg flex items-center h-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-600">
                        <UserPlus size={28} className="text-indigo-500" />
                        <p className="ml-3 text-md font-bold text-gray-900 dark:text-white">Edit Profile</p>
                    </div>
                    }
                </div>
            </div>

            {isEditProfileOpen && <EditProfile user={user} onClose={() => setEditProfileOpen(false)} />}

            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Publishing Progress</h3>
                <div className="bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-1">{userBlogs.length} / {totalBlogs} blogs</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Bookmarks</h3>
                {bookmarkedBlogs.length > 0 ? (
                    <div className="space-y-4">
                        {bookmarkedBlogs.map(blog => (
                            <Link key={blog.id} href={`/blog/${blog.id}`}>
                                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-between shadow hover:shadow-lg transition-shadow">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{blog.title}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">You haven't bookmarked any blogs yet.</p>
                )}
            </div>
        </div>
    )
}
