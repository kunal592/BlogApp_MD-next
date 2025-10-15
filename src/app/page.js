
import BlogContainer from '../components/BlogContainer'
import prisma from '@/lib/prisma'

async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'published' },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
  // In a real app, you might want to handle the case where `blogs` is null or empty.
  // For now, we'll assume it always returns an array.
  // The `JSON.parse(JSON.stringify(blogs))` is a workaround to avoid a Next.js serialization issue with dates.
  return JSON.parse(JSON.stringify(blogs));
}

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Welcome to Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Discover insightful articles on web development, design, and more.</p>
      </div>
      
      <BlogContainer blogs={blogs} />
    </div>
  )
}

export const revalidate = 60; // Revalidate every 60 seconds
