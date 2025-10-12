'use client';

import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle blog post submission
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white"
          />
        </div>
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="bg-white dark:bg-neutral-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default PostBlog;
