
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import BlogContainer from '@/components/BlogContainer'

async function getFeedBlogs(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { following: true },
  });

  if (!user) {
    return [];
  }

  const followedAuthorIds = user.following.map((author) => author.id);

  const feedBlogs = await prisma.blog.findMany({
    where: {
      authorId: {
        in: followedAuthorIds,
      },
      status: 'published',
    },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return JSON.parse(JSON.stringify(feedBlogs));
}

export default async function FeedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const feedBlogs = await getFeedBlogs(session.user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your Feed</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Blogs from authors you follow.</p>
      </div>
      
      {feedBlogs.length > 0 ? (
        <BlogContainer blogs={feedBlogs} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 dark:text-gray-400">Your feed is empty. Follow some authors to see their blogs here.</p>
        </div>
      )}
    </div>
  );
}
