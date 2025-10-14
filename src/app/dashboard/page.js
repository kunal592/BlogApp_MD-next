
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import BlogGrid from "@/components/BlogGrid";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userBlogs = await prisma.blog.findMany({
    where: { authorId: session.user.id },
    include: { author: true },
  });

  const bookmarkedBlogs = await prisma.blog.findMany({
    where: { bookmarks: { some: { userId: session.user.id } } },
    include: { author: true },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1>
        <Link href="/postblog" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Post Blog
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Blogs</h2>
        <BlogGrid blogs={userBlogs} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookmarks</h2>
        <BlogGrid blogs={bookmarkedBlogs} />
      </div>
    </div>
  );
}
