
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostBlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('published');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, image, tags: tagsArray, status }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/blog/${data.id}`);
    } else {
      // Handle error
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
          rows="6"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image URL (Optional)
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Post
        </button>
      </div>
    </form>
  );
}
