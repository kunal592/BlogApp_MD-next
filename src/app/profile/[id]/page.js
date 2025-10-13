'use client'
import React from 'react';
import { useApp } from '../../../context/AppContext';
import ProfileCard from '../../../components/ProfileCard';
import BlogGrid from '../../../components/BlogGrid';
import ProfileDashboard from '../../../components/ProfileDashboard';

export default function ProfilePage({ params }) {
  const { users, blogs } = useApp();
  const user = users.find(u => u.id === params.id);

  if (!user) return <div className="text-center py-16">User not found</div>;

  const userBlogs = blogs.filter(b => b.authorId === user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProfileCard user={user} />
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Published Blogs</h2>
        <BlogGrid blogs={userBlogs} showAuthor={false} />
      </div>
      <ProfileDashboard user={user} />
    </div>
  );
}
