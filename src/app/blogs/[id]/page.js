
import { getBlog } from "@/app/actions/blog.actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Heart, Share2, MessageSquare, Bookmark } from "lucide-react";
import { Toaster, toast } from "sonner";

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  const handleLike = () => toast.success("You liked this blog!");
  const handleShare = () => toast.info("Blog link copied to clipboard!");
  const handleBookmark = () => toast.success("Blog saved to your bookmarks!");

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center mb-4">
          <Image
            src={blog.author.image}
            alt={blog.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-4 flex items-center">
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Follow
            </button>
          </div>
        </div>
        {blog.image && (
          <div className="mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        <div className="flex items-center justify-between mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-1 text-gray-500 hover:text-red-500">
              <Heart size={20} />
              <span>Like</span>
            </button>
            <button onClick={handleShare} className="flex items-center gap-1 text-gray-500 hover:text-indigo-500">
              <Share2 size={20} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
              <MessageSquare size={20} />
              <span>Comment</span>
            </button>
          </div>
          <button onClick={handleBookmark} className="flex items-center gap-1 text-gray-500 hover:text-yellow-500">
            <Bookmark size={20} />
            <span>Bookmark</span>
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {/* Comment form and list will go here */}
        </div>
      </div>
    </div>
  );
}
