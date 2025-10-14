
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import BlogGrid from "@/components/BlogGrid";
import NotFound from "@/components/NotFound";

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const bookmarkedBlogs = await prisma.blog.findMany({
    where: { bookmarks: { some: { userId: session.user.id } } },
    include: { author: true },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">My Bookmarks</h1>
      {bookmarkedBlogs.length === 0 ? (
        <NotFound message="You haven’t bookmarked any blogs yet." />
      ) : (
        <BlogGrid blogs={bookmarkedBlogs} />
      )}
    </div>
  );
}
