
import { getBlog } from "@/app/actions/blog.actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
      </div>
    </div>
  );
}
