
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import NotFound from "@/components/NotFound";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommentSection from "@/components/CommentSection";
import ClapButton from "@/components/ClapButton";
import FollowButton from "@/components/FollowButton";
import ShareMenu from "@/components/ShareMenu";
import BookmarkButton from "@/components/BookmarkButton";
import AiSummary from "@/components/AiSummary";

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export default async function BlogDetailPage({ params }) {
  const session = await getServerSession(authOptions);

  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!blog) {
    return <NotFound message="Blog not found" />;
  }

  const readingTime = calculateReadingTime(blog.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <span>by {blog.author.name}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </div>

      <div className="flex items-center justify-between my-8">
        <div className="flex flex-wrap gap-4">
          <ClapButton blogId={blog.id} initialClaps={blog.likes} />
          <BookmarkButton blogId={blog.id} />
          <ShareMenu blogTitle={blog.title} blogUrl={`/blog/${blog.id}`} />
        </div>
      </div>

      <AiSummary content={blog.content} />

      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={blog.author.avatar} className="w-16 h-16 rounded-full" alt="author" />
              <div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white">{blog.author.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{blog.author.bio}</div>
              </div>
            </div>
          {session && session.user.id !== blog.author.id && <FollowButton targetUserId={blog.author.id} />} 
        </div>
      </div>

      <CommentSection blogId={blog.id} />
    </article>
  );
}
